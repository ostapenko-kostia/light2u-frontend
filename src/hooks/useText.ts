import { textsService } from '@/services/texts.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useEditText() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: { id: number; text: string }) => {
			return await textsService.editText(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['texts get'] })
			toast.success('Успішно оновлено')
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
