import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { defaultLocale, locales } from './lib/i18n'
import axios from 'axios'
import { TOKEN } from './typing/enums'

const protectedRoutes = ['/admin', '/admin/:path*']

function getLocale(request: NextRequest) {
	const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
	if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale

	const referer = request.headers.get('referer')
	if (referer) {
		try {
			const parts = new URL(referer).pathname.split('/')
			const refLocale = parts[1]
			if (locales.includes(refLocale)) return refLocale
		} catch {}
	}

	const headers = { 'accept-language': request.headers.get('accept-language') || defaultLocale }
	const languages = new Negotiator({ headers }).languages()
	return match(languages, locales, defaultLocale)
}

function getLocaleFromPath(pathname: string) {
	const first = pathname.split('/')[1]
	return locales.includes(first) ? first : null
}

function stripLocaleFromPath(pathname: string) {
	const parts = pathname.split('/')
	return locales.includes(parts[1]) ? '/' + parts.slice(2).join('/') : pathname
}

function addLocaleCookie(response: NextResponse, locale: string) {
	response.cookies.set('NEXT_LOCALE', locale, {
		maxAge: 60 * 60 * 24 * 365,
		path: '/'
	})
	return response
}

const intlMiddleware = createMiddleware({
	locales,
	defaultLocale,
	localePrefix: 'always'
})

function isProtected(path: string) {
	return protectedRoutes.some(route => {
		const pattern = new RegExp(`^${route.replace(/:\w+\*/g, '.*')}$`)
		return pattern.test(path)
	})
}

async function verifyToken(token: string) {
	try {
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admins/verify`, { token })
		return res.status === 200
	} catch {
		return false
	}
}

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	const localeFromPath = getLocaleFromPath(pathname)
	const pathWithoutLocale = stripLocaleFromPath(pathname)

	if (pathname.startsWith('/api/')) return NextResponse.next()

	// Redirect to locale if none
	if (
		pathname === '/' ||
		(!pathname.match(new RegExp(`^/(${locales.join('|')})(/|$)`)) && !pathname.match(/\.\w+$/))
	) {
		const locale = getLocale(req)
		const newPath = `/${locale}${pathname === '/' ? '' : pathname}`
		req.nextUrl.pathname = newPath
		const res = NextResponse.redirect(req.nextUrl)
		return addLocaleCookie(res, locale)
	}

	const token = req.cookies.get(TOKEN.ADMIN_ACCESS_TOKEN)?.value || ''
	const isAdmin = isProtected(pathWithoutLocale)
	const isLogin = pathname.includes('/admin-login') || pathWithoutLocale === '/admin-login'

	if (isAdmin && token) {
		const valid = await verifyToken(token)

		if (!valid) {
			const locale = localeFromPath || getLocale(req)
			const res = NextResponse.redirect(new URL(`/${locale}/admin-login`, req.url))
			return addLocaleCookie(res, locale)
		}
	} else if (isLogin && token) {
		const valid = await verifyToken(token)
		if (valid) {
			const locale = localeFromPath || getLocale(req)
			const res = NextResponse.redirect(new URL(`/${locale}/admin`, req.url))
			return addLocaleCookie(res, locale)
		}
	} else if (isAdmin && !token) {
		const locale = localeFromPath || getLocale(req)
		const res = NextResponse.redirect(new URL(`/${locale}/admin-login`, req.url))
		return addLocaleCookie(res, locale)
	}

	const locale = localeFromPath || getLocale(req)
	const response = await intlMiddleware(req)
	return addLocaleCookie(response, locale)
}

export const config = {
	matcher: [
		'/',
		'/about/:path*',
		'/contacts/:path*',
		'/catalog/:path*',
		'/product/:path*',
		'/admin/:path*',
		'/admin-login/:path*',
		'/:locale/admin/:path*',
		'/:locale/admin-login/:path*'
	]
}
