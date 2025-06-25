import { api } from '@/lib/axios'
import { ITextField } from '@/typing/interfaces'

class TextsService {
	async getAllTexts() {
		try {
			const res: ITextField[] | undefined = (await (
				await fetch(`${process.env.NEXT_PUBLIC_API_URL}/texts`, {
					method: 'GET',
					next: {
						revalidate: 180
					}
				})
			).json()).data


			if (!res?.length) throw new Error('Помилка при отриманні данних')
			return res
		} catch (error) {
			console.error('Error getting all texts:', error)
			return []
		}
	}

	async getTextsByLocale(locale: string = 'uk') {
		try {
			const allTexts = await this.getAllTexts()
			const localeTexts = allTexts?.filter(text => text.locale === locale) || []

			return localeTexts.reduce((acc, curr) => {
				acc[curr.slug] = curr.text
				return acc
			}, {} as Record<string, string>)
		} catch (error) {
			console.error('Error getting texts by locale:', error)
			return {}
		}
	}

	async editText({ id, text }: { id: number; text: string }) {
		return await api.put(`/texts/${id}`, { text })
	}
}

export const textsService = new TextsService()
