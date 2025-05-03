import { api } from '@/lib/axios'
import type { Product, ProductInfo } from '@prisma/client'

type ProductWithInfo = Product & {
	info: ProductInfo[]
}

class ProductsService {
	async getAllProducts() {
		try {
			const res = await api.get<ProductWithInfo[]>('/products/all')
			if (res.status != 200) throw new Error('Помилка при отриманні товарів')
			return res
		} catch {}
	}

	async deleteProduct(id: number) {
		return await api.delete(`/products/delete/${id}`)
	}

	async createProduct(formData: FormData) {
		return await api.post('/products/create', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async updateProduct(id: number, formData: FormData) {
		return await api.put(`/products/edit/${id}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async duplicateProduct(id: number) {
		return await api.post(`/products/duplicate/${id}`)
	}

	async moveProductUp(id: number) {
		return await api.put(`/products/move/up/${id}`)
	}

	async moveProductDown(id: number) {
		return await api.put(`/products/move/down/${id}`)
	}
}

export const productsService = new ProductsService()
