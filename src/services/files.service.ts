import { api } from '@/lib/axios'
import { IFile } from '@/typing/interfaces'

class FileService {
	async deleteFile(title: string) {
		return await api.delete(`/storage/${title}`)
	}

	async createFile(file: FileList) {
		const formData = new FormData()
		formData.append('file', file[0])
		return await api.post(`/storage`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async getAllFiles() {
		return (await api.get<{ data: IFile[] }>('/storage')).data.data
	}
}

export const fileService = new FileService()
