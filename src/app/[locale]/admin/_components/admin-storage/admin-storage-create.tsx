'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
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
	const { register, handleSubmit, setValue, formState } = useForm<Form>()
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
			queryClient.invalidateQueries({ queryKey: ['files get'] })
			toast.success('Файл успішно завантажено!')
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
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-8'
				onSubmit={handleSubmit(data => createFunc(data))}
			>
				<FileInput
					label='Файл'
					multiple={false}
					accept='image/*'
					onChange={file => {
						if (file) {
							setValue('file', file)
						}
					}}
				/>
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
					className='bg-gray-800 text-white w-min px-12 py-2 self-end rounded-md hover:bg-gray-700'
				>
					Створити
				</button>
			</form>
		</Dialog>
	)
}
