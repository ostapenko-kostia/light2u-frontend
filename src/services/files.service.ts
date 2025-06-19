import { api } from '@/lib/axios'
import { IFile } from '@/typing/interfaces'

class FileService {
	async deleteFile(title: string) {
		return await api.delete(`/storage/${title}`)
	}

	async createFile(data: FormData) {
		return await api.post(`/storage`, data, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async getAllFiles() {
		return (await api.get<{ data: IFile[] }>('/storage')).data.data
	}
}

export const fileService = new FileService()
