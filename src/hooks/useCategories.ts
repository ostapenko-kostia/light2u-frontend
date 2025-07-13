import { categoriesService } from '@/services/categories.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useGetFirstLevelCategories() {
	return useQuery({
		queryKey: ['categories get first level'],
		queryFn: async () => await categoriesService.getAllFirstLevelCategories()
	})
}

export function useGetSecondLevelCategories() {
	return useQuery({
		queryKey: ['categories get second level'],
		queryFn: async () => await categoriesService.getAllSecondLevelCategories()
	})
}

export function useCreateFirstLevelCategory() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: { nameUk: string; nameRu: string; image: FileList }) => {
			return categoriesService.createFirstLevelCategory(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get first level'] })
			toast.success('Успішно створено')
		}
	})
}

export function useCreateSecondLevelCategory() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: {
			nameUk: string
			nameRu: string
			image: FileList
			parentCategorySlug: string
		}) => {
			return categoriesService.createSecondLevelCategory(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get second level'] })
			toast.success('Успішно створено')
		}
	})
}

export function useEditFirstLevelCategory() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: { id: number; nameUk: string; nameRu: string; image?: FileList }) =>
			categoriesService.editFirstLevelCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get first level'] })
			toast.success('Успішно оновлено')
		}
	})
}

export function useEditSecondLevelCategory() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: {
			id: number
			nameUk: string
			nameRu: string
			image?: FileList
			parentCategorySlug: string
		}) => categoriesService.editSecondLevelCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get second level'] })
			toast.success('Успішно оновлено')
		}
	})
}

export function useDeleteFirstLevelCategory() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: number) => categoriesService.deleteFirstLevelCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get first level'] })
			toast.success('Успішно видалено')
		}
	})
}

export function useDeleteSecondLevelCategory() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: number) => categoriesService.deleteSecondLevelCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get second level'] })
			toast.success('Успішно видалено')
		}
	})
}
