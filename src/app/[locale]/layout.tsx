import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header/header'
import { locales } from '@/lib/i18n'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { textsService } from '@/services/texts.service'
import Provider from './providers'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic']
})

export const metadata: Metadata = {
	title: 'Light 2U',
	description: 'Light 2U'
}

export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}

export default async function RootLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	if (!locales.includes(locale)) notFound()

	let messages
	try {
		messages = await textsService.getTextsByLocale(locale)
	} catch (error) {
		console.error('Failed to load messages:', error)
		messages = {}
	}

	return (
		<html lang={locale}>
			<body className={clsx('flex flex-col', inter.className)}>
				<Provider
					locale={locale}
					messages={messages}
				>
					<Toaster containerStyle={{ zIndex: 10000 }} />
					<Header locale={locale} />
					<main className='grow'>{children}</main>
					<Footer />
				</Provider>
			</body>
		</html>
	)
}
