import { api } from '@/lib/axios'
import { IFirstLevelCategory, ISecondLevelCategory } from '@/typing/interfaces'

class CategoriesService {
	async getAllFirstLevelCategories() {
		try {
			const res = await api.get<{ data: IFirstLevelCategory[]; ok: boolean }>(
				'/first-level-categories'
			)
			if (!res.data.ok) throw new Error('Помилка при отриманні категорій першого рівня')
			return res.data.data
		} catch {}
	}

	async getAllSecondLevelCategories() {
		try {
			const res = await api.get<{ data: ISecondLevelCategory[]; ok: boolean }>(
				'/second-level-categories'
			)
			if (!res.data.ok) throw new Error('Помилка при отриманні категорій другого рівня')
			return res.data.data
		} catch {}
	}

	async createFirstLevelCategory({
		nameUk,
		nameRu,
		image
	}: {
		nameUk: string
		nameRu: string
		image: FileList
	}) {
		const formData = new FormData()
		formData.append('name', JSON.stringify({ uk: nameUk, ru: nameRu }))
		formData.append('image', image[0])
		return (
			await api.post('/first-level-categories', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		).data
	}

	async createSecondLevelCategory(data: {
		nameUk: string
		nameRu: string
		image: FileList
		parentCategorySlug: string
	}) {
		const formData = new FormData()
		formData.append('name', JSON.stringify({ uk: data.nameUk, ru: data.nameRu }))
		formData.append('image', data.image[0])
		formData.append('parentCategorySlug', data.parentCategorySlug)
		return (
			await api.post('/second-level-categories', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		).data
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
		return (
			await api.put(`/first-level-categories/${id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		).data
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
		return (
			await api.put(`/second-level-categories/${id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		).data
	}

	async deleteFirstLevelCategory(id: number) {
		return (await api.delete(`/first-level-categories/${id}`)).data
	}

	async deleteSecondLevelCategory(id: number) {
		return (await api.delete(`/second-level-categories/${id}`)).data
	}
}

export const categoriesService = new CategoriesService()
