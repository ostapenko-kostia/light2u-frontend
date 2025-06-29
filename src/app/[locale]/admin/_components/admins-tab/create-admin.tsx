'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { useAdminCreate } from '@/hooks/useAdmin'
import { useQueryClient } from '@tanstack/react-query'
import { LockIcon, MailIcon, PlusIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	email: string
	password: string
}

export function CreateAdmin() {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { register, handleSubmit } = useForm<Form>()
	const queryClient = useQueryClient()
	const { mutateAsync: createFunc, isPending, isSuccess, isError } = useAdminCreate()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває створення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['admins get'] })
			toast.success('Адміна успішно створено!')
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	return (
		<Dialog
			title='Додати адміна'
			trigger={
				<button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2'>
					<PlusIcon
						color='#fff'
						size={20}
					/>{' '}
					Додати адміна
				</button>
			}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-8'
				onSubmit={handleSubmit(data => createFunc(data))}
			>
				<div className='flex items-start flex-col gap-3'>
					<label
						htmlFor='email'
						className='flex items-center gap-2'
					>
						<MailIcon /> Пошта
					</label>
					<input
						className='w-full rounded-md border border-gray-500 bg-white px-5 py-3 text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='email'
						required
						placeholder='123@gmail.com'
						id='email'
						{...register('email', { required: true })}
					/>
				</div>
				<div className='flex items-start flex-col gap-3'>
					<label
						htmlFor='password'
						className='flex items-center gap-2'
					>
						<LockIcon /> Пароль
					</label>
					<input
						className='w-full rounded-md border border-gray-500 bg-white px-5 py-3 text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='password'
						required
						placeholder='12345678'
						id='password'
						{...register('password', { required: true })}
					/>
				</div>
				<button
					type='submit'
					className='bg-gray-800 text-white w-min mx-auto rounded-md px-12 py-2 hover:bg-gray-700'
				>
					Створити
				</button>
			</form>
		</Dialog>
	)
}
