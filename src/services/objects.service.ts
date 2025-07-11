import { api } from '@/lib/axios'
import { IObject } from '@/typing/interfaces'

class ObjectsService {
	async getObjects(): Promise<IObject[]> {
		const response = await api.get<{ data: IObject[]; ok: boolean }>('/objects')
		return response.data.data
	}

	async getById(id: number): Promise<IObject> {
		const response = await api.get<{ data: IObject; ok: boolean }>(`/objects/id/${id}`)
		return response.data.data
	}

	async getBySlug(slug: string): Promise<IObject> {
		const response = await api.get<{ data: IObject; ok: boolean }>(`/objects/slug/${slug}`)
		return response.data.data
	}

	async createObject(dto: {
		images: FileList
		name: string
		description: string
		city: string
		address: string
		locale: string
	}): Promise<{ data: IObject; ok: boolean }> {
		const formData = new FormData()
		const { images, ...rest } = dto

		Array.from(images).forEach(image => {
			formData.append('images', image)
		})

		formData.append('info', JSON.stringify(rest))

		const response = await api.post<{ data: IObject; ok: boolean }>('/objects', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return response.data
	}

	async updateObject(
		id: number,
		dto: {
			images?: FileList
			name?: string
			description?: string
			city?: string
			address?: string
		}
	): Promise<{ data: IObject; ok: boolean }> {
		const formData = new FormData()
		const { images, ...rest } = dto

		if (!!images && images.length > 0) {
			Array.from(images).forEach(image => {
				formData.append('images', image)
			})
		}

		formData.append('info', JSON.stringify(rest))

		const response = await api.put<{ data: IObject; ok: boolean }>(`/objects/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return response.data
	}

	async deleteObject(id: number): Promise<boolean> {
		const response = await api.delete<{ ok: boolean }>(`/objects/${id}`)
		return response.data.ok
	}
}

export const objectsService = new ObjectsService()
