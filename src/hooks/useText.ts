import { textsService } from '@/services/texts.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useEditText() {
	return useMutation({
		mutationKey: ['edit text'],
		mutationFn: async (data: { id: number; text: string }) => {
			const res = await textsService.editText(data)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export function useGetTexts() {
	return useQuery({
		queryKey: ['texts get'],
		queryFn: async () => await textsService.getAllTexts(),
		refetchOnWindowFocus: false
	})
}

export function useGetTextsByLocale(locale: string = 'uk') {
	return useQuery({
		queryKey: ['texts', locale],
		queryFn: async () => {
			const res = await textsService.getTextsByLocale(locale)
			return res
		},
		refetchOnWindowFocus: false
	})
}
