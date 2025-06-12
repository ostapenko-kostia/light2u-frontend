import { TOKEN } from '@/typing/enums'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

api.interceptors.request.use(config => {
	const token = Cookies.get(TOKEN.ADMIN_ACCESS_TOKEN)
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

api.interceptors.response.use(
	response => response,
	error => {
		if (error?.response?.data) {
			const { message } = error?.response?.data
			toast.error(message)
		} else if (error?.response?.status === 500) {
			toast.error('Something went wrong. Try again later.')
		}
	}
)
