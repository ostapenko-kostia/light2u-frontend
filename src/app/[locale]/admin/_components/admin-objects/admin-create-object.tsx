'use client'

import { Dialog } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateObject } from '@/hooks/useObjects'
import { useQueryClient } from '@tanstack/react-query'
import { PlusCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	images: FileList
	name: string
	description: string
	city: string
	address: string
	locale: string
}

interface Props {
	locale: 'uk' | 'ru'
}

export function AdminObjectCreate({ locale }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { register, handleSubmit, setValue, watch } = useForm<Form>()
	const { mutateAsync: createFunc, isPending, isSuccess, isError } = useCreateObject()

	useEffect(() => {
		setValue('locale', locale)
	}, [locale, setValue])

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває створення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['objects get'] })
			toast.success("Об'єкт успішно створено!")
		}
		if (isError) {
			loadingToastId && toast.dismiss(loadingToastId)
		}
	}, [isPending, isSuccess, isError])

	return (
		<Dialog
			title="Створити об'єкт"
			trigger={
				<button className='w-full h-full min-h-56 bg-[rgba(0,0,0,.35)] hover:bg-[rgba(0,0,0,.6)] transition-colors duration-700 rounded-md flex flex-col gap-4 items-center justify-center'>
					<PlusCircleIcon
						size={90}
						stroke='#fff'
					/>
					<h3 className='text-white text-2xl font-medium'>Створити</h3>
				</button>
			}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-4'
				onSubmit={handleSubmit(data => {
					if (!data.images || data.images.length === 0) {
						toast.error('Будь ласка, додайте хоча б одне зображення')
						return
					}
					createFunc(data)
				})}
			>
				<div>
					<label
						htmlFor='images'
						className='flex items-center gap-2'
					>
						Зображення <span className='text-red-400'>*</span>
					</label>
					<FileInput
						className='w-full appearance-none rounded-md border border-[#ccc] bg-white text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
						multiple
						onChange={files => {
							if (files) {
								setValue('images', files)
							}
						}}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='name'
						className='flex items-center gap-2'
					>
						Назва <span className='text-red-400'>*</span>
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder="Об'єкт"
						id='name'
						{...register('name', { required: true })}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='city'
						className='flex items-center gap-2'
					>
						Місто <span className='text-red-400'>*</span>
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder='Київ'
						id='city'
						{...register('city', { required: true })}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='address'
						className='flex items-center gap-2'
					>
						Адреса <span className='text-red-400'>*</span>
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder='вул. Хрещатик, 1'
						id='address'
						{...register('address', { required: true })}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='url'
						className='flex items-center gap-2'
					>
						Опис <span className='text-red-400'>*</span>
					</label>
					<Textarea
						className='w-full min-h-[200px] rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm resize-y focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						required
						placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero similique, quam harum autem voluptatem natus repellendus voluptate, unde, error ducimus animi qui accusantium dolorum molestiae iusto cum minus impedit. Facere.'
						id='description'
						{...register('description', { required: true })}
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
