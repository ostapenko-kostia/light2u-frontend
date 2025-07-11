import { objectsService } from '@/services/objects.service'
import { useMutation, useQuery } from '@tanstack/react-query'

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
	return useMutation({
		mutationKey: ['object delete'],
		mutationFn: async (id: number) => {
			const ok = await objectsService.deleteObject(id)
			if (!ok) return Promise.reject()
		}
	})
}

export function useCreateObject() {
	interface Props {
		images: FileList
		name: string
		description: string
		city: string
		address: string
		locale: string
	}
	return useMutation({
		mutationKey: ['object create'],
		mutationFn: async (data: Props) => {
			const res = await objectsService.createObject(data)
			if (!res.ok) return Promise.reject()
			return res
		}
	})
}

export function useUpdateObject() {
	interface Props {
		images?: FileList
		name?: string
		description?: string
		city?: string
		address?: string
	}
	return useMutation({
		mutationKey: ['object update'],
		mutationFn: async ({ data, id }: { data: Props; id: number }) => {
			const res = await objectsService.updateObject(id, data)
			if (!res.ok) return Promise.reject()
			return res
		}
	})
}
