import { productsService } from '@/services/products.service'
import { useMutation, useQuery } from '@tanstack/react-query'

interface ProductInfoInput {
	key: string
	value: string
}

interface BaseProductData {
	name: string
	price: number
	images: FileList
	description: string
	categorySlug: string
	locale: string
	productInfo: ProductInfoInput[]
	quantity: number
}

export const useGetProducts = () => {
	return useQuery({
		queryKey: ['products get'],
		queryFn: async () => await productsService.getAllProducts(),
		refetchOnWindowFocus: false
	})
}

export const useDeleteProduct = () => {
	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			const res = await productsService.deleteProduct(id)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useCreateProduct = () => {
	return useMutation({
		mutationFn: async (data: BaseProductData) => {
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
	return useMutation({
		mutationFn: async ({ id, data }: { id: number; data: Partial<BaseProductData> }) => {
			const formData = new FormData()

			if (data.images) {
				Array.from(data.images).forEach(el => {
					formData.append('images', el)
				})
			}

			const { images, ...dataWithoutImages } = data
			formData.append('productInfo', JSON.stringify(dataWithoutImages))

			const res = await productsService.updateProduct(id, formData)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useDuplicateProduct = () => {
	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			const res = await productsService.duplicateProduct(id)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useMoveProductUp = () => {
	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			const res = await productsService.moveProductUp(id)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useMoveProductDown = () => {
	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			const res = await productsService.moveProductDown(id)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}
