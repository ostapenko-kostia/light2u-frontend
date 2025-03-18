'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { useCreateFile } from '@/hooks/useStorage'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { PlusIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	file: FileList
	name: string
}

export function CreateFile() {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { register, handleSubmit, watch, formState } = useForm<Form>()
	const { errors } = formState

	const { mutateAsync: createFunc, isPending, isSuccess, isError } = useCreateFile()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває створення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['storage get'] })
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	return (
		<Dialog
			title='Завантажити файл'
			trigger={
				<button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2'>
					<PlusIcon
						color='#fff'
						size={20}
					/>{' '}
					Завантажити файл
				</button>
			}
		>
			<form
				className='mx-auto bg-white rounded-md p-4 w-[400px] h-min flex flex-col gap-8 max-sm:w-[90%]'
				onSubmit={handleSubmit(data => createFunc(data))}
			>
				<div className='flex items-start flex-col gap-3'>
					<label htmlFor='file'>Файл</label>
					<label className='w-min text-nowrap appearance-none rounded-md border border-[#ccc] bg-white text-[#333] placeholder:text-[#808080] px-7 cursor-pointer py-3 text-sm focus:z-10 focus:bg-indigo-500 focus:outline-none'>
						Вибрати файл
						<input
							className='hidden'
							type='file'
							id='file'
							{...register('file')}
						/>
					</label>{' '}
					{watch('file') && (
						<div className='flex flex-col gap-2'>
							<span>{watch('file')[0].name}</span>
						</div>
					)}
				</div>
				<div className='flex items-start flex-col gap-3'>
					<label
						htmlFor='name'
						className='flex items-center gap-2'
					>
						Назва
					</label>
					<input
						className={clsx(
							'w-full rounded-md border border-gray-500 bg-white px-5 py-3 text-sm placeholder:text-gray-400 focus:z-10 focus:outline-none',
							{ 'border-red-500': errors.name }
						)}
						type='text'
						required
						placeholder='Картинка 1'
						pattern='^[\w\s-]+$'
						id='name'
						{...register('name', {
							required: true,
							pattern: {
								value: /^[\w\s-]+$/,
								message: 'Допустимі тільки літери, цифри, пробіли, дефіси та підкреслення'
							}
						})}
					/>
					{errors.name && <span className='text-red-600 text-sm'>{errors.name.message}</span>}
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
