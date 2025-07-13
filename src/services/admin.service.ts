import { api } from '@/lib/axios'
import { TOKEN } from '@/typing/enums'
import { IAdmin } from '@/typing/interfaces'
import Cookies from 'js-cookie'

class AdminService {
	async auth(email: string, password: string) {
		const res = await api.post<{ accessToken: string; user: IAdmin; ok: boolean }>(
			'/admins/login',
			{ email, password }
		)
		Cookies.set(TOKEN.ADMIN_ACCESS_TOKEN, res.data.accessToken, {
			expires: new Date().getDay() + 1
		})
		return res.data
	}

	async createAdmin(email: string, password: string) {
		return (await api.post('/admins/create', { email, password })).data
	}

	async getAllAdmins() {
		try {
			const res = await api.get<{ data: IAdmin[]; ok: boolean }>('/admins')
			if (!res.data.ok) throw new Error('Помилка при отриманні адміністраторів')
			return res.data.data
		} catch {}
	}

	async deleteAdmin(id: number) {
		return (await api.delete(`/admins/${id}`)).data
	}
}

export const adminService = new AdminService()
