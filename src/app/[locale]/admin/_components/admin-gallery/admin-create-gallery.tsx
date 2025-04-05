'use client'

import { Dialog } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { useCreateGalleryItem } from '@/hooks/useGallery'
import { useQueryClient } from '@tanstack/react-query'
import { PlusCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	image: FileList
}

export function AdminSlideCreate() {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { setValue, handleSubmit } = useForm<Form>()
	const { mutateAsync: createFunc, isPending, isSuccess, isError } = useCreateGalleryItem()

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває створення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['gallery get'] })
		}
		if (isError) {
			loadingToastId && toast.dismiss(loadingToastId)
		}
	}, [isPending, isSuccess, isError])

	return (
		<Dialog
			title='Добавити картинку'
			trigger={
				<button className='w-full h-full min-h-56 bg-[rgba(0,0,0,.35)] hover:bg-[rgba(0,0,0,.6)] transition-colors duration-700 rounded-md flex flex-col gap-4 items-center justify-center'>
					<PlusCircleIcon
						size={90}
						stroke='#fff'
					/>
					<h3 className='text-white text-2xl font-medium'>Добавити</h3>
				</button>
			}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-4'
				onSubmit={handleSubmit(data => createFunc(data))}
			>
				<label
					htmlFor='images'
					className='flex items-center gap-2'
				>
					Зображення <span className='text-red-400'>*</span>
				</label>
				<FileInput
					className='w-full appearance-none rounded-md border border-[#ccc] bg-white text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
					multiple={false}
					onChange={file => {
						if (file) {
							setValue('image', file)
						}
					}}
				/>

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
