'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { useCreateFirstLevelCategory } from '@/hooks/useCategories'
import { useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	image: FileList
	nameUk: string
	nameRu: string
}

export function AdminCreateFirstLevelCategory() {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { register, handleSubmit, setValue } = useForm<Form>()
	const queryClient = useQueryClient()
	const { mutateAsync: createFunc, isPending, isSuccess, isError } = useCreateFirstLevelCategory()

	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває створення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['categories get'] })
			toast.success('Категорію першого рівня успішно створено!')
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	const onSubmit = (data: Form) => {
		createFunc(data)
	}

	return (
		<Dialog
			title='Створити категорію першого рівня'
			trigger={
				<button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2'>
					<PlusIcon
						color='#fff'
						size={20}
					/>{' '}
					Додати категорію
				</button>
			}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-8'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<FileInput
						label='Зображення'
						multiple={false}
						accept='image/*'
						onChange={file => {
							if (file) {
								setValue('image', file)
							}
						}}
					/>
				</div>
				<div className='flex items-start flex-col gap-3'>
					<label
						htmlFor='nameUk'
						className='flex items-center gap-2'
					>
						Назва (укр)
					</label>
					<input
						className='w-full rounded-md border border-gray-500 bg-white px-5 py-3 text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder='Категорія'
						id='nameUk'
						{...register('nameUk', { required: true })}
					/>
				</div>
				<div className='flex items-start flex-col gap-3'>
					<label
						htmlFor='nameRu'
						className='flex items-center gap-2'
					>
						Назва (рус)
					</label>
					<input
						className='w-full rounded-md border border-gray-500 bg-white px-5 py-3 text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder='Категорія'
						id='nameRu'
						{...register('nameRu', { required: true })}
					/>
				</div>
				<button
					type='submit'
					className='bg-gray-800 text-white w-min px-12 py-2 rounded-md mx-auto hover:bg-gray-700'
				>
					Створити
				</button>
			</form>
		</Dialog>
	)
}
