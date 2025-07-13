import { BaseProductData, productsService } from '@/services/products.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useGetProducts = () => {
	return useQuery({
		queryKey: ['products get'],
		queryFn: async () => await productsService.getAllProducts(),
		refetchOnWindowFocus: false
	})
}

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await productsService.deleteProduct(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			toast.success('Успішно видалено')
		}
	})
}

export const useCreateProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: BaseProductData) => {
			return await productsService.createProduct(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			toast.success('Успішно створено')
		}
	})
}

export const useUpdateProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id, data }: { id: number; data: Partial<BaseProductData> }) => {
			return await productsService.updateProduct({ id, data })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			toast.success('Успішно оновлено')
		}
	})
}

export const useDuplicateProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await productsService.duplicateProduct(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			toast.success('Успішно дубльовано')
		}
	})
}

export const useMoveProductUp = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await productsService.moveProductUp(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			toast.success('Успішно переміщено вгору')
		}
	})
}

export const useMoveProductDown = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await productsService.moveProductDown(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			toast.success('Успішно переміщено вниз')
		}
	})
}
