import { emailService } from '@/services/email.service'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from './useTranslation'

export function useContactUs() {
	const { t } = useTranslation()

	return useMutation({
		mutationFn: async (data: { name: string; email: string; message: string }) => {
			const res = await emailService.contactUs(data)
			if (!res.data.ok) throw new Error('Failed to send email')
			return res.data
		},
		onSuccess: () => {
			toast.success(t('contacts-form-success'))
		},
	})
}
