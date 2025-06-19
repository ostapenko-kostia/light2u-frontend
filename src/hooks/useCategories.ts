import { categoriesService } from '@/services/categories.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
			const formData = new FormData()
			formData.append('name', JSON.stringify({ uk: data.nameUk, ru: data.nameRu }))
			formData.append('image', data.image[0])
			return categoriesService.createFirstLevelCategory(formData)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get first level'] })
		}
	})
}

export function useCreateSecondLevelCategory() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: { nameUk: string; nameRu: string; image: FileList; parentCategorySlug: string }) => {	
			const formData = new FormData()
			formData.append('name', JSON.stringify({ uk: data.nameUk, ru: data.nameRu }))
			formData.append('image', data.image[0])
			formData.append('parentCategorySlug', data.parentCategorySlug)
			return categoriesService.createSecondLevelCategory(formData)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get second level'] })
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
		}
	})
}

export function useDeleteFirstLevelCategory() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: number) => categoriesService.deleteFirstLevelCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get first level'] })
		}
	})
}

export function useDeleteSecondLevelCategory() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: number) => categoriesService.deleteSecondLevelCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories get second level'] })
		}
	})
}
