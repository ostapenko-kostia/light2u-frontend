'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { locales } from '@/lib/i18n'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import Select from 'react-select'
import { OptionType, customStyles } from './header-select.styles'

export function HeaderLangSwitcher({ className }: { className?: string }) {
	const { locale } = useTranslation()
	const router = useRouter()
	const pathname = usePathname()

	const switchLanguage = useCallback(
		(newLocale: string) => {
			if (newLocale === locale) return

			Cookies.set('NEXT_LOCALE', newLocale, { expires: 365, path: '/' })

			const pathnameWithoutLocale =
				pathname.replace(new RegExp(`^/(${locales.join('|')})`), '') || '/'

			router.push(`/${newLocale}${pathnameWithoutLocale}`)
		},
		[locale, pathname, router]
	)

	return (
		<div suppressHydrationWarning>
			<Select<OptionType>
				instanceId='lang-switcher'
				className={className}
				value={{ value: locale, label: locale.toUpperCase() }}
				onChange={option => option && switchLanguage(option.value)}
				styles={customStyles}
				isSearchable={false}
				options={locales.map(loc => ({ value: loc, label: loc.toUpperCase() }))}
			/>
		</div>
	)
}
