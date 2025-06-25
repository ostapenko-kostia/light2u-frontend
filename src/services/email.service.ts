import { api } from '@/lib/axios'

class EmailService {
	async contactUs(data: { name: string; email: string; message: string }) {
		return api.post('/email/contact-us', data)
	}
}

export const emailService = new EmailService()
