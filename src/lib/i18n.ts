import { textsService } from '@/services/texts.service'
import { getRequestConfig } from 'next-intl/server'

export const locales = ['uk', 'ru']
export const defaultLocale = 'uk'

export default getRequestConfig(async ({ locale }) => {
	// Get translations from the database
	const messages = await textsService.getTextsByLocale(locale)

	return {
		messages,
		// Ensure locale is always a string
		locale: locale || defaultLocale
	}
})
