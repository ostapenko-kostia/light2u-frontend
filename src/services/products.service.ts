import { api } from '@/lib/axios'
import { IProduct } from '@/typing/interfaces'

class ProductsService {
	async getAllProducts() {
		try {
			const res = await api.get<{ data: IProduct[]; ok: boolean }>('/products')
			if (!res.data.ok) throw new Error('Помилка при отриманні товарів')
			return res.data.data
		} catch {}
	}

	async deleteProduct(id: number) {
		return await api.delete(`/products/${id}`)
	}

	async createProduct(formData: FormData) {
		return await api.post('/products', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async updateProduct(id: number, formData: FormData) {
		return await api.put(`/products/${id}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async duplicateProduct(id: number) {
		return await api.post(`/products/${id}/duplicate`)
	}

	async moveProductUp(id: number) {
		return await api.patch(`/products/${id}/move-up`)
	}

	async moveProductDown(id: number) {
		return await api.patch(`/products/${id}/move-down`)
	}
}

export const productsService = new ProductsService()
