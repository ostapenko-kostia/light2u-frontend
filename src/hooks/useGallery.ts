import { galleryService } from '@/services/gallery.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useGetGallery() {
	return useQuery({
		queryKey: ['gallery get'],
		queryFn: async () => {
			const res = await galleryService.getAll()
			if (!res?.data) return Promise.reject()
			return res.data
		},
		refetchOnWindowFocus: false
	})
}

export function useDeleteGalleryItem() {
	return useMutation({
		mutationFn: async (id: number) => {
			const res = await galleryService.delete(id)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export function useCreateGalleryItem() {
	return useMutation({
		mutationFn: async ({ image }: { image: FileList }) => {
			const formData = new FormData()
			formData.append('image', image[0])

			const res = await galleryService.create(formData)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}
