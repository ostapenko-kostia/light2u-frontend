import { fileService } from '@/services/files.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useGetFiles() {
	return useQuery({
		queryKey: ['files get'],
		queryFn: async () => await fileService.getAllFiles(),
		refetchOnWindowFocus: false
	})
}

export function useDeleteFile() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (file: string) => {
			return await fileService.deleteFile(file)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['files get'] })
			toast.success('Успішно видалено')
		}
	})
}

export function useCreateFile() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (file: FileList) => {
			return await fileService.createFile(file)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['files get'] })
			toast.success('Успішно завантажено')
		}
	})
}
