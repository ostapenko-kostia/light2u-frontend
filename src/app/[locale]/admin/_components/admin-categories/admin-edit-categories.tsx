'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { useEditFirstLevelCategory, useEditSecondLevelCategory } from '@/hooks/useCategories'
import { IFirstLevelCategory, ISecondLevelCategory } from '@/typing/interfaces'
import { useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

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
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { register, handleSubmit, setValue } = useForm<Form>()
	const {
		mutateAsync: editFirstLevelFunc,
		isPending: isFirstLevelPending,
		isSuccess: isFirstLevelSuccess,
		isError: isFirstLevelError
	} = useEditFirstLevelCategory()
	const {
		mutateAsync: editSecondLevelFunc,
		isPending: isSecondLevelPending,
		isSuccess: isSecondLevelSuccess,
		isError: isSecondLevelError
	} = useEditSecondLevelCategory()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	const isPending = isFirstLevelPending || isSecondLevelPending
	const isSuccess = isFirstLevelSuccess || isSecondLevelSuccess
	const isError = isFirstLevelError || isSecondLevelError

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває зміна...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['categories get'] })
			toast.success('Категорію успішно змінено!')
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	const edit = async (data: Form) => {
		const formData = {
			id: Number(category.id),
			nameUk: data.name.uk,
			nameRu: data.name.ru,
			image: data.image ?? undefined
		}

		if ('parentCategorySlug' in category) {
			// This is a second level category - keep the existing parentCategorySlug
			await editSecondLevelFunc({
				...formData,
				parentCategorySlug: category.parentCategorySlug
			})
		} else {
			// This is a first level category
			await editFirstLevelFunc(formData)
		}
	}

	return (
		<Dialog
			title='Змінити категорію'
			trigger={<button className='text-blue-600 hover:text-blue-900'>Редагувати</button>}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-8'
				onSubmit={handleSubmit(data => edit(data))}
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
						defaultValue={(category.name as { uk: string }).uk}
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
						defaultValue={(category.name as { ru: string }).ru}
						placeholder='Категорія'
						id='nameRu'
						{...register('name.ru')}
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
