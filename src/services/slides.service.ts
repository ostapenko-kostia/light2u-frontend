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
		return (await api.delete(`/slides/${id}`)).data
	}

	async createSlide(data: {
		background: FileList
		text: string
		url: string
		description: string
		locale: string
	}) {
		const formData = new FormData()
		const { background, ...rest } = data

		Array.from(background).forEach(el => formData.append('background', el))
		formData.append('info', JSON.stringify(rest))

		return (
			await api.post('/slides', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		).data
	}

	async updateSlide(
		id: number,
		data: {
			background?: FileList
			text?: string
			url?: string
			description?: string
			locale?: string
		}
	) {
		const formData = new FormData()
		const { background, ...rest } = data

		if (background) Array.from(background).forEach(el => formData.append('background', el))
		formData.append('info', JSON.stringify(rest))

		return (
			await api.put(`/slides/${id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		).data
	}
}

export const slideService = new SlideService()
