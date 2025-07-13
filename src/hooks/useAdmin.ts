import { adminService } from '@/services/admin.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useGetAdmins() {
	return useQuery({
		queryKey: ['admins get'],
		queryFn: async () => await adminService.getAllAdmins(),
		refetchOnWindowFocus: false
	})
}

export function useAdminAuth() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ email, password }: { email: string; password: string }) => {
			return await adminService.auth(email, password)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admins get'] })
			toast.success('Успішно')
		}
	})
}

export function useAdminCreate() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ email, password }: { email: string; password: string }) => {
			return await adminService.createAdmin(email, password)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admins get'] })
			toast.success('Успішно створено')
		}
	})
}

export function useAdminDelete() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await adminService.deleteAdmin(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admins get'] })
			toast.success('Успішно видалено')
		}
	})
}
