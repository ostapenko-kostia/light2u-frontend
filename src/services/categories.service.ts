import { Category } from '@prisma/client'
import { api } from '@/lib/axios'

class CategoriesService {
	async getAllCategories() {
		try {
			const res = await api.get<Category[]>('/categories/all')
			if (res.status != 200) throw new Error('Помилка при отриманні категорій')
			return res
		} catch {}
	}

	async createCategory({ name, image }: { name: { ua: string; ru: string }; image: FileList }) {
		const formData = new FormData()
		formData.append('name', JSON.stringify(name))
		formData.append('image', image[0])
		return await api.post('/categories/create', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async editCategory({
		id,
		nameUa,
		nameRu,
		image
	}: {
		id: number
		nameUa?: string
		nameRu?: string
		image?: FileList
	}) {
		const formData = new FormData()
		formData.append('name', JSON.stringify({ ua: nameUa, ru: nameRu }))
		if (image) formData.append('image', image[0])
		return await api.put(`/categories/edit/${id}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async deleteCategory(id: number) {
		return await api.delete(`/categories/delete/${id}`)
	}
}

export const categoriesService = new CategoriesService()
