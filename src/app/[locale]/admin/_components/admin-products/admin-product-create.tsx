'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreateProduct } from '@/hooks/useProducts'
import { SecondLevelCategory } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowDownIcon, ArrowUpIcon, PlusCircleIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface ProductInfo {
	key: string
	value: string
}

interface Form {
	name: string
	price: number
	images: FileList
	description: string
	categorySlug: string
	locale: string
	productInfo: ProductInfo[]
}

interface Props {
	category: SecondLevelCategory | undefined
	locale: 'uk' | 'ru'
}

export function AdminProductCreate({ category, locale }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { register, handleSubmit, setValue, control } = useForm<Form>({
		defaultValues: {
			productInfo: []
		}
	})
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'productInfo'
	})
	const { mutateAsync: createFunc, isPending, isSuccess, isError } = useCreateProduct()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	useEffect(() => {
		setValue('locale', locale)
		setValue('categorySlug', category!.slug)
	}, [locale, category, setValue])

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває створення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	const create = async (data: Form) => {
		await createFunc({
			...data,
			productInfo: data.productInfo
				.filter(info => info.key && info.value)
				.map((info, index) => ({
					...info,
					order: index
				}))
		})
	}

	const addProductInfo = () => {
		append({ key: '', value: '' })
	}

	const removeProductInfo = (index: number) => {
		if (fields.length > 1) {
			remove(index)
		}
	}

	const moveUp = (index: number) => {
		if (index > 0) {
			move(index, index - 1)
		}
	}

	const moveDown = (index: number) => {
		if (index < fields.length - 1) {
			move(index, index + 1)
		}
	}

	return (
		<Dialog
			title='Створити товар'
			trigger={
				<button className='min-h-52 w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300'>
					<PlusCircleIcon
						size={24}
						className='text-gray-400'
					/>
				</button>
			}
		>
			<form
				className='mx-auto bg-white rounded-md px-4 h-min flex flex-col gap-4 w-[90%]'
				onSubmit={handleSubmit(data => create(data))}
			>
				<div className='flex flex-col gap-2'>
					<FileInput
						label='Зображення'
						multiple
						accept='image/*'
						onChange={files => {
							if (files) {
								setValue('images', files)
							}
						}}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='name'>Назва</Label>
					<Input
						id='name'
						placeholder='Наприклад: Люстра Crystal 5'
						className='border-gray-200'
						{...register('name')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='price'>Ціна</Label>
					<Input
						id='price'
						type='number'
						placeholder='Наприклад: 2500'
						className='border-gray-200'
						{...register('price', { valueAsNumber: true })}
					/>
				</div>

				<div className='flex flex-col gap-4'>
					<div className='flex items-center justify-between'>
						<Label>Додаткова інформація</Label>
						<button
							type='button'
							onClick={addProductInfo}
							className='flex items-center gap-2 text-blue-600 hover:text-blue-800'
						>
							<PlusIcon size={16} />
							Додати поле
						</button>
					</div>
					<div className='space-y-4'>
						{fields.map((field, index) => (
							<div
								key={field.id}
								className='flex items-center gap-4'
							>
								<div className='flex flex-col gap-1'>
									<button
										type='button'
										onClick={() => moveUp(index)}
										disabled={index === 0}
										className='text-gray-400 hover:text-gray-600 disabled:opacity-50'
									>
										<ArrowUpIcon size={20} />
									</button>
									<button
										type='button'
										onClick={() => moveDown(index)}
										disabled={index === fields.length - 1}
										className='text-gray-400 hover:text-gray-600 disabled:opacity-50'
									>
										<ArrowDownIcon size={20} />
									</button>
								</div>
								<div className='flex-1'>
									<Input
										placeholder='Назва поля'
										className='border-gray-200'
										{...register(`productInfo.${index}.key`)}
									/>
								</div>
								<div className='flex-1'>
									<Input
										placeholder='Значення'
										className='border-gray-200'
										{...register(`productInfo.${index}.value`)}
									/>
								</div>
								<button
									type='button'
									onClick={() => removeProductInfo(index)}
									className='text-red-600 hover:text-red-800'
									disabled={fields.length === 1}
								>
									<Trash2Icon size={20} />
								</button>
							</div>
						))}
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='description'>Опис</Label>
					<Textarea
						id='description'
						placeholder='Опишіть товар детально...'
						className='border-gray-200'
						{...register('description')}
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
