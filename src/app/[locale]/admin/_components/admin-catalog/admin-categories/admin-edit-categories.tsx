'use client'

import { Dialog } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { useEditFirstLevelCategory, useEditSecondLevelCategory } from '@/hooks/useCategories'
import { IFirstLevelCategory, ISecondLevelCategory } from '@/typing/interfaces'
import { EditIcon, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
	category: IFirstLevelCategory | ISecondLevelCategory
}

interface Form {
	image: FileList
	name: {
		uk: string
		ru: string
	}
}

export function AdminEditCategory({ category }: Props) {
	const { register, handleSubmit, setValue, reset } = useForm<Form>({
		defaultValues: {
			name: {
				uk: (category.name as { uk: string }).uk,
				ru: (category.name as { ru: string }).ru
			}
		}
	})
	const { mutateAsync: editFirstLevelFunc, isPending: isFirstLevelPending } =
		useEditFirstLevelCategory()
	const { mutateAsync: editSecondLevelFunc, isPending: isSecondLevelPending } =
		useEditSecondLevelCategory()

	const isPending = isFirstLevelPending || isSecondLevelPending

	useEffect(() => {
		reset({
			name: {
				uk: (category.name as { uk: string }).uk,
				ru: (category.name as { ru: string }).ru
			}
		})
	}, [category, reset])

	const edit = async (data: Form) => {
		const formData = {
			id: Number(category.id),
			nameUk: data.name.uk,
			nameRu: data.name.ru,
			image: data.image ?? undefined
		}

		if ('parentCategorySlug' in category) {
			await editSecondLevelFunc({
				...formData,
				parentCategorySlug: category.parentCategorySlug
			})
		} else {
			await editFirstLevelFunc(formData)
		}
	}

	return (
		<Dialog
			title='Змінити категорію'
			trigger={
				<button className='text-blue-600 hover:text-blue-900'>
					<EditIcon />
				</button>
			}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-8'
				onSubmit={handleSubmit(async data => {
					try {
						await edit(data)
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
						placeholder='Категорія'
						id='nameUk'
						{...register('name.uk')}
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
						placeholder='Категорія'
						id='nameRu'
						{...register('name.ru')}
					/>
				</div>
				<button
					type='submit'
					className='bg-gray-800 text-white w-min px-12 py-2 rounded-md mx-auto hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
					disabled={isPending}
				>
					{isPending ? <Loader2 className='animate-spin' /> : 'Зберегти'}
				</button>
			</form>
		</Dialog>
	)
}
