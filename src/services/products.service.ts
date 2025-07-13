import { api } from '@/lib/axios'
import { IProduct } from '@/typing/interfaces'

export interface ProductInfoInput {
	key: string
	value: string
}

export interface BaseProductData {
	name: string
	price: number
	images: FileList
	description: string
	categorySlug: string
	locale: string
	productInfo: ProductInfoInput[]
	quantity: number
}

class ProductsService {
	async getAllProducts() {
		try {
			const res = await api.get<{ data: IProduct[]; ok: boolean }>('/products')
			if (!res.data.ok) throw new Error('Помилка при отриманні товарів')
			return res.data.data
		} catch {}
	}

	async deleteProduct(id: number) {
		return (await api.delete(`/products/${id}`)).data
	}

	async createProduct(data: BaseProductData) {
		const formData = new FormData()

		Array.from(data.images).forEach(el => {
			formData.append('images', el)
		})
		const { images, ...dataWithoutImages } = data
		formData.append('productInfo', JSON.stringify(dataWithoutImages))

		return (
			await api.post('/products', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		).data
	}

	async updateProduct({ id, data }: { id: number; data: Partial<BaseProductData> }) {
		const formData = new FormData()

		if (data.images) {
			Array.from(data.images).forEach(el => {
				formData.append('images', el)
			})
		}

		const { images, ...dataWithoutImages } = data
		formData.append('productInfo', JSON.stringify(dataWithoutImages))

		return (
			await api.put(`/products/${id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		).data
	}

	async duplicateProduct(id: number) {
		return (await api.post(`/products/${id}/duplicate`)).data
	}

	async moveProductUp(id: number) {
		return (await api.patch(`/products/${id}/move-up`)).data
	}

	async moveProductDown(id: number) {
		return (await api.patch(`/products/${id}/move-down`)).data
	}
}

export const productsService = new ProductsService()
