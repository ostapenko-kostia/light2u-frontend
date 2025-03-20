'use client'

import { Dialog } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateSlide } from '@/hooks/useSlides'
import { Slide } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { EditIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	background?: FileList
	text?: string
	url?: string
	description?: string
}

interface Props {
	slide: Slide
}

export function AdminSlideEdit({ slide }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { register, handleSubmit, setValue } = useForm<Form>({
		defaultValues: {
			background: undefined,
			text: slide.text,
			url: slide.url,
			description: slide.description
		}
	})
	const { mutateAsync: editFunc, isPending, isSuccess, isError } = useUpdateSlide()

	const edit = async (data: Form) => {
		await editFunc({
			id: slide.id,
			data: {
				url: data.url ?? slide.url,
				text: data.text ?? slide.text,
				description: data.description ?? slide.description,
				background: data.background ?? undefined
			}
		})
	}

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває зміна...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['slides get'] })
		}
		if (isError) {
			loadingToastId && toast.dismiss(loadingToastId)
		}
	}, [isPending, isSuccess, isError])

	return (
		<Dialog
			title='Змінити слайд'
			trigger={
				<button>
					<EditIcon />
				</button>
			}
		>
			<form
				className='mx-auto bg-white rounded-md p-4 w-[400px] h-min flex flex-col gap-4 max-sm:w-[90%]'
				onSubmit={handleSubmit(data => edit(data))}
			>
				<div>
					<label
						htmlFor='images'
						className='flex items-center gap-2'
					>
						Зображення
					</label>
					<FileInput
						className='w-full appearance-none rounded-md border border-[#ccc] bg-white text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
						multiple={false}
						onChange={file => {
							if (file) {
								setValue('background', file)
							}
						}}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='text'
						className='flex items-center gap-2'
					>
						Текст
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						placeholder='Слайд'
						id='text'
						{...register('text')}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='url'
						className='flex items-center gap-2'
					>
						Посилання
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='url'
						placeholder='https://example.com'
						id='url'
						{...register('url')}
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
					Змінити
				</button>
			</form>
		</Dialog>
	)
}
