'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { useAdminEdit } from '@/hooks/useAdmin'
import { Admin } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { EditIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	email: string
	password: string
}

interface Props {
	admin: Admin
}

export function EditAdmin({ admin }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { register, handleSubmit } = useForm<Form>()
	const queryClient = useQueryClient()
	const { mutateAsync: editFunc, isPending, isSuccess, isError } = useAdminEdit()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває зміна...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['admins get'] })
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	const edit = async (data: Form) => {
		await editFunc({
			id: admin.id,
			email: data.email ?? admin.login,
			password: data.password ?? undefined
		})
	}

	return (
		<Dialog
			title='Змінити інформацію'
			trigger={
				<button
					className='text-blue-600 hover:text-blue-900 disabled:text-blue-200 disabled:cursor-not-allowed'
					disabled={admin.login === 'ostapenkokpersonal@gmail.com'}
				>
					Редагувати
				</button>
			}
		>
			<form
				className='mx-auto bg-white rounded-md p-4 w-[400px] h-min flex flex-col gap-8 max-sm:w-[90%]'
				onSubmit={handleSubmit(data => edit(data))}
			>
				<div className='flex items-start flex-col gap-3'>
					<label
						htmlFor='email'
						className='flex items-center gap-2'
					>
						<EditIcon /> Пошта
					</label>
					<input
						className='w-full rounded-md border border-gray-500 bg-white px-5 py-3 text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='email'
						placeholder='123@gmail.com'
						defaultValue={admin.login}
						id='email'
						{...register('email')}
					/>
				</div>
				<div className='flex items-start flex-col gap-3'>
					<label
						htmlFor='password'
						className='flex items-center gap-2'
					>
						<EditIcon /> Пароль
					</label>
					<input
						className='w-full rounded-md border border-gray-500 bg-white px-5 py-3 text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='password'
						placeholder='12345678'
						id='password'
						{...register('password')}
					/>
				</div>
				<button
					type='submit'
					className='bg-gray-800 text-white w-min px-12 py-2 rounded-md mx-auto hover:bg-gray-700'
				>
					Зберегти
				</button>
			</form>
		</Dialog>
	)
}
