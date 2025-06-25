'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useGetTextsByLocale } from './useText'

export function useTranslation() {
	const t = useTranslations()
	const params = useParams()
	const locale = typeof params.locale === 'string' ? params.locale : 'uk'

	const { data: dbTexts = {} } = useGetTextsByLocale(locale)

	return {
		t: (key: string, defaultValue?: string) => {
			try {
				return t(key)
			} catch {
				return dbTexts[key] || defaultValue || key
			}
		},
		texts: dbTexts,
		locale
	}
}
