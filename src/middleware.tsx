import { match } from '@formatjs/intl-localematcher'
import { Admin } from '@prisma/client'
import axios from 'axios'
import Negotiator from 'negotiator'
import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { defaultLocale, locales } from './lib/i18n'
import { TOKEN } from './typing/enums'

const protectedRoutes = ['/admin', '/admin/:path*']

function getLocale(request: NextRequest) {
	const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
	if (cookieLocale && locales.includes(cookieLocale)) {
		return cookieLocale
	}

	const referer = request.headers.get('referer')
	if (referer) {
		try {
			const refererUrl = new URL(referer)
			const refererPathParts = refererUrl.pathname.split('/')
			if (refererPathParts.length > 1) {
				const locale = refererPathParts[1]
				if (locales.includes(locale)) {
					return locale
				}
			}
		} catch {}
	}

	const headers = { 'accept-language': request.headers.get('accept-language') || defaultLocale }
	const languages = new Negotiator({ headers }).languages()
	return match(languages, locales, defaultLocale)
}

function getLocaleFromPathname(pathname: string) {
	const segments = pathname.split('/')
	const firstSegment = segments[1] || ''
	return locales.includes(firstSegment) ? firstSegment : null
}

function getPathWithoutLocale(pathname: string) {
	const segments = pathname.split('/')
	if (segments.length > 1 && locales.includes(segments[1])) {
		return '/' + segments.slice(2).join('/')
	}
	return pathname
}

function addLocaleCookie(response: NextResponse, locale: string) {
	response.cookies.set('NEXT_LOCALE', locale, {
		maxAge: 60 * 60 * 24 * 365, // 1 year
		path: '/'
	})
	return response
}

const intlMiddleware = createMiddleware({
	locales,
	defaultLocale,
	localePrefix: 'always'
})

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const pathLocale = getLocaleFromPathname(pathname)
	const pathWithoutLocale = getPathWithoutLocale(pathname)

	if (pathname.startsWith('/api/')) return NextResponse.next()

	if (
		pathname === '/' ||
		(!pathname.match(new RegExp(`^/(${locales.join('|')})(/|$)`)) && !pathname.match(/\.\w+$/))
	) {
		const locale = getLocale(request)
		const newPath = `/${locale}${pathname === '/' ? '' : pathname}`
		request.nextUrl.pathname = newPath
		const response = NextResponse.redirect(request.nextUrl)
		return addLocaleCookie(response, locale)
	}

	const isAdminRoute = protectedRoutes.some(route => {
		const pattern = new RegExp(`^${route.replace(/:\w+\*/g, '.*')}$`)
		return pattern.test(pathWithoutLocale)
	})

	if (isAdminRoute) {
		try {
			const token = request.cookies.get(TOKEN.ADMIN_ACCESS_TOKEN)?.value
			if (!token) {
				const locale = pathLocale || getLocale(request)
				const response = NextResponse.redirect(new URL(`/${locale}/admin-login`, request.url))
				return addLocaleCookie(response, locale)
			}

			const decoded = (
				await axios.post<{ login: string }>(`${process.env.NEXT_PUBLIC_API_URL}/admin/verify`, {
					token
				})
			).data

			const admins = (await axios.get<Admin[]>(`${process.env.NEXT_PUBLIC_API_URL}/admin/all`)).data
			const admin = admins.find(admin => admin.login === decoded.login)

			if (admin) {
				if (pathLocale) {
					const res = await intlMiddleware(request)
					return addLocaleCookie(res, pathLocale)
				}
				return intlMiddleware(request)
			}

			const locale = pathLocale || getLocale(request)
			const response = NextResponse.redirect(new URL(`/${locale}/admin-login`, request.url))
			return addLocaleCookie(response, locale)
		} catch (error) {
			const locale = pathLocale || getLocale(request)
			const response = NextResponse.redirect(new URL(`/${locale}/admin-login`, request.url))
			return addLocaleCookie(response, locale)
		}
	}

	const isLoginPage = pathname.includes('/admin-login') || pathWithoutLocale === '/admin-login'
	if (isLoginPage) {
		const token = request.cookies.get(TOKEN.ADMIN_ACCESS_TOKEN)?.value
		if (!token) {
			if (pathLocale) {
				const res = await intlMiddleware(request)
				return addLocaleCookie(res, pathLocale)
			}
			return intlMiddleware(request)
		}

		const locale = pathLocale || getLocale(request)
		const response = NextResponse.redirect(new URL(`/${locale}/admin`, request.url))
		return addLocaleCookie(response, locale)
	}

	if (pathLocale) {
		const res = await intlMiddleware(request)
		return addLocaleCookie(res, pathLocale)
	}

	return intlMiddleware(request)
}

export const config = {
	matcher: [
		// Root path
		'/',
		// Main pages
		'/about/:path*',
		'/contacts/:path*',
		'/catalog/:path*',
		'/product/:path*',
		// Admin routes with and without locales
		'/admin/:path*',
		'/admin-login/:path*',
		'/:locale/admin/:path*',
		'/:locale/admin-login/:path*'
	]
}
