'use client'

import { Dialog } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { useCreateFirstLevelCategory } from '@/hooks/useCategories'
import { Loader2, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface Form {
	image: FileList
	nameUk: string
	nameRu: string
}

export function AdminCreateFirstLevelCategory() {
	const { register, handleSubmit, setValue, reset } = useForm<Form>()
	const { mutateAsync: createFunc, isPending } = useCreateFirstLevelCategory()

	return (
		<Dialog
			title='Створити категорію першого рівня'
			trigger={
				<button className='text-gray-600 px-4 py-2 rounded flex items-center justify-center gap-2 w-full border border-gray-300 mt-3 cursor-pointer hover:bg-gray-200 transition-colors duration-200'>
					<PlusIcon size={20} /> Додати категорію
				</button>
			}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-8'
				onSubmit={handleSubmit(async data => {
					try {
						await createFunc(data)
						reset()
					} catch {}
				})}
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
					className='bg-gray-800 text-white w-min px-12 py-2 rounded-md mx-auto hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
					disabled={isPending}
				>
					{isPending ? <Loader2 className='animate-spin' /> : 'Створити'}
				</button>
			</form>
		</Dialog>
	)
}
