import { textsService } from '@/services/texts.service'
import { defaultLocale } from './i18n'

export async function getServerTranslation(locale?: string) {
	// If locale is not provided, use default
	const resolvedLocale = locale || defaultLocale

	// Get translations from the database
	const messages = await textsService.getTextsByLocale(resolvedLocale)

	return {
		t: (key: string, defaultValue?: string) => {
			return messages[key] || defaultValue || key
		},
		locale: resolvedLocale
	}
}
