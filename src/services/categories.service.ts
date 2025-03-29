import { api } from '@/lib/axios'
import { FirstLevelCategory, SecondLevelCategory } from '@prisma/client'

class CategoriesService {
	async getAllFirstLevelCategories() {
		try {
			const res = await api.get<FirstLevelCategory[]>('/first-level-categories/all')
			if (res.status != 200) throw new Error('Помилка при отриманні категорій першого рівня')
			return res.data
		} catch {}
	}

	async getAllSecondLevelCategories() {
		try {
			const res = await api.get<SecondLevelCategory[]>('/second-level-categories/all')
			if (res.status != 200) throw new Error('Помилка при отриманні категорій другого рівня')
			return res.data
		} catch {}
	}

	async createFirstLevelCategory(formData: FormData) {
		return await api.post('/first-level-categories/create', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async createSecondLevelCategory(formData: FormData) {
		return await api.post('/second-level-categories/create', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async editFirstLevelCategory({
		id,
		nameUk,
		nameRu,
		image
	}: {
		id: number
		nameUk?: string
		nameRu?: string
		image?: FileList
	}) {
		const formData = new FormData()
		formData.append('name', JSON.stringify({ uk: nameUk, ru: nameRu }))
		if (image) formData.append('image', image[0])
		return await api.put(`/first-level-categories/edit/${id}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async editSecondLevelCategory({
		id,
		nameUk,
		nameRu,
		image
	}: {
		id: number
		nameUk?: string
		nameRu?: string
		image?: FileList
	}) {
		const formData = new FormData()
		formData.append('name', JSON.stringify({ uk: nameUk, ru: nameRu }))
		if (image) formData.append('image', image[0])
		return await api.put(`/second-level-categories/edit/${id}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async deleteFirstLevelCategory(id: number) {
		return await api.delete(`/first-level-categories/delete/${id}`)
	}

	async deleteSecondLevelCategory(id: number) {
		return await api.delete(`/second-level-categories/delete/${id}`)
	}
}

export const categoriesService = new CategoriesService()
