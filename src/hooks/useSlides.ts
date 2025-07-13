import { slideService } from '@/services/slides.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useGetSlides() {
	return useQuery({
		queryKey: ['slides get'],
		queryFn: async () => await slideService.getAllSlides(),
		refetchOnWindowFocus: false
	})
}

export function useDeleteSlide() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			return await slideService.deleteSlide(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['slides get'] })
			toast.success('Успішно видалено')
		}
	})
}

export function useCreateSlide() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: {
			background: FileList
			text: string
			url: string
			description: string
			locale: string
		}) => {
			return await slideService.createSlide(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['slides get'] })
			toast.success('Успішно створено')
		}
	})
}

export function useUpdateSlide() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({
			data,
			id
		}: {
			data: {
				background?: FileList
				text?: string
				url?: string
				description?: string
				locale?: string
			}
			id: number
		}) => {
			return await slideService.updateSlide(id, data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['slides get'] })
			toast.success('Успішно оновлено')
		}
	})
}
