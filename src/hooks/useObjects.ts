import { objectsService } from '@/services/objects.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useGetObjects() {
	return useQuery({
		queryKey: ['objects get'],
		queryFn: async () => await objectsService.getObjects(),
		refetchOnWindowFocus: false
	})
}

export function useGetObjectById(id: number) {
	return useQuery({
		queryKey: ['object get by id', id],
		queryFn: async () => await objectsService.getById(id),
		refetchOnWindowFocus: false
	})
}

export function useGetObjectBySlug(slug: string) {
	return useQuery({
		queryKey: ['object get by slug', slug],
		queryFn: async () => await objectsService.getBySlug(slug),
		refetchOnWindowFocus: false
	})
}

export function useDeleteObject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			return await objectsService.deleteObject(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['objects get'] })
			toast.success('Успішно видалено')
		}
	})
}

export function useCreateObject() {
	const queryClient = useQueryClient()
	interface Props {
		images: FileList
		name: string
		description: string
		city: string
		address: string
		locale: string
	}
	return useMutation({
		mutationFn: async (data: Props) => {
			return await objectsService.createObject(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['objects get'] })
			toast.success('Успішно створено')
		}
	})
}

export function useUpdateObject() {
	const queryClient = useQueryClient()
	interface Props {
		images?: FileList
		name?: string
		description?: string
		city?: string
		address?: string
	}
	return useMutation({
		mutationFn: async ({ data, id }: { data: Props; id: number }) => {
			return await objectsService.updateObject(id, data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['objects get'] })
			toast.success('Успішно оновлено')
		}
	})
}
