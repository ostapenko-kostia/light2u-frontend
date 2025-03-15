import { Header } from '@/components/layout/header/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import clsx from 'clsx'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic']
})

export const metadata: Metadata = {
	title: 'Light 2U',
	description: 'Light 2U'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={clsx('flex flex-col', inter.className)}>
				<Header />
				<main className='grow'>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
