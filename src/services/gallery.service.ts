import { Gallery } from '@prisma/client'
import { api } from '@/lib/axios'

class GalleryService {
	async getAll() {
		try {
			const res = await api.get<Gallery[]>('/gallery/all')
			if (res.status != 200) throw new Error('Помилка при отриманні галереї')
			return res
		} catch {}
	}

	async delete(id: number) {
		return await api.delete(`/gallery/delete/${id}`)
	}

	async create(data: FormData) {
		return await api.post('/gallery/create', data, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}

export const galleryService = new GalleryService()
