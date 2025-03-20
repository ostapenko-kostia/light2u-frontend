'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlClientProvider } from 'next-intl'
import { type PropsWithChildren } from 'react'

export default function Provider({
	children,
	locale,
	messages
}: PropsWithChildren<{ locale: string; messages: any }>) {
	const queryClient = new QueryClient()
	return (
		<NextIntlClientProvider
			locale={locale}
			timeZone={'Europe/Kiev'}
			messages={messages}
		>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</NextIntlClientProvider>
	)
}
