import { productsService } from '@/services/products.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetProducts = () => {
	return useQuery({
		queryKey: ['products get'],
		queryFn: async () => {
			const res = await productsService.getAllProducts()
			if (!res?.data) return Promise.reject()
			return res.data
		},
		refetchOnWindowFocus: false
	})
}

export const useDeleteProduct = () => {
	return useMutation({
		mutationKey: ['product delete'],
		mutationFn: async ({ id }: { id: number }) => {
			const res = await productsService.deleteProduct(id)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useCreateProduct = () => {
	interface Props {
		name: string
		price: number
		images: FileList
		description: string
		categorySlug: string
		materials: string
		dimensions: string
		weight: string
		power: string
		voltage: number
		bulb: string
		bulbColor: string
		bulbType: string
		locale: string
	}

	return useMutation({
		mutationKey: ['product create'],
		mutationFn: async (data: Props) => {
			const formData = new FormData()

			Array.from(data.images).forEach(el => {
				formData.append('images', el)
			})
			const { images, ...dataWithoutImages } = data
			formData.append('productInfo', JSON.stringify(dataWithoutImages))

			const res = await productsService.createProduct(formData)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useUpdateProduct = () => {
	interface Props {
		name?: string
		price?: number
		images?: FileList
		description?: string
		categorySlug?: string
		materials?: string
		dimensions?: string
		weight?: string
		power?: string
		voltage?: number
		bulb?: string
		bulbColor?: string
		bulbType?: string
		locale?: string
	}

	return useMutation({
		mutationKey: ['product edit'],
		mutationFn: async ({ id, data }: { id: number; data: Props }) => {
			const formData = new FormData()

			if (data.images) {
				Array.from(data.images).forEach(el => {
					formData.append('images', el)
				})
			}
			const dataForForm = Object.entries(data).reduce((acc, [key, value]) => {
				if (key !== 'images') acc[key] = value
				if (!value && key !== 'isNew') delete acc[key]
				return acc
			}, {} as Record<string, string>)

			formData.append('productInfo', JSON.stringify(dataForForm))

			const res = await productsService.updateProduct(id, formData)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}
