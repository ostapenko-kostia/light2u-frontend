import { api } from '@/lib/axios'
import { ISlide } from '@/typing/interfaces'

class SlideService {
	async getAllSlides() {
		try {
			const res = await api.get<{ data: ISlide[]; ok: boolean }>('/slides')
			if (!res.data.ok) throw new Error('Помилка при отриманні слайдів')
			return res.data.data
		} catch {}
	}

	async deleteSlide(id: number) {
		return await api.delete(`/slides/${id}`)
	}

	async createSlide(data: FormData) {
		return await api.post('/slides', data, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async updateSlide(id: number, data: FormData) {
		return await api.put(`/slides/${id}`, data, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}

export const slideService = new SlideService()
