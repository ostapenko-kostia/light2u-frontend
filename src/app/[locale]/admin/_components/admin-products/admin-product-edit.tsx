'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { useUpdateProduct } from '@/hooks/useProducts'
import { Product, ProductInfo, SecondLevelCategory } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { EditIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	name?: string
	price?: number
	images: FileList
	description?: string
	categorySlug?: string
	locale?: string
	productInfo: { key: string; value: string }[]
}

interface Props {
	categories: SecondLevelCategory[] | undefined
	product: Product & { info: ProductInfo[] }
}

export function AdminProductEdit({ categories, product }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { register, handleSubmit, setValue, control } = useForm<Form>({
		defaultValues: {
			productInfo: product.info.map(info => ({
				key: info.key,
				value: info.value
			}))
		}
	})
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'productInfo'
	})
	const { mutateAsync: editFunc, isPending, isSuccess, isError } = useUpdateProduct()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	const edit = async (data: Form) => {
		data.locale = product.locale
		await editFunc({
			id: product.id,
			data: {
				...data,
				productInfo:
					typeof data.productInfo === 'string'
						? JSON.parse(data.productInfo)
						: data.productInfo.filter(info => info.key && info.value)
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
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	const handleCategoryChange = (value: string) => {
		setValue('categorySlug', value)
	}

	const addProductInfo = () => {
		append({ key: '', value: '' })
	}

	const removeProductInfo = (index: number) => {
		if (fields.length > 1) {
			remove(index)
		}
	}

	return (
		<Dialog
			title='Змінити інформацію про товар'
			trigger={
				<button>
					<EditIcon />
				</button>
			}
		>
			<form
				className='mx-auto bg-white rounded-md px-4 h-min flex flex-col gap-4 w-[90%]'
				onSubmit={handleSubmit(data => edit(data))}
			>
				<div className='flex flex-col gap-2'>
					<label>Зображення</label>
					<FileInput
						multiple={true}
						accept='image/*'
						onChange={files => {
							if (files) {
								setValue('images', files)
							}
						}}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='name'>Назва</label>
					<input
						id='name'
						defaultValue={product.name}
						placeholder='Наприклад: Люстра Crystal 5'
						className='border border-gray-200 rounded-md p-2'
						{...register('name')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='price'>Ціна</label>
					<input
						id='price'
						type='number'
						defaultValue={product.price}
						placeholder='Наприклад: 2500'
						className='border border-gray-200 rounded-md p-2'
						{...register('price', { valueAsNumber: true })}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='categorySlug'>Категорія</label>
					<select
						id='categorySlug'
						defaultValue={product.categorySlug}
						onChange={e => handleCategoryChange(e.target.value)}
						className='border border-gray-200 rounded-md p-2'
					>
						<option value=''>Виберіть категорію</option>
						{categories?.map(category => (
							<option
								key={category.id}
								value={category.slug}
							>
								{(category.name as { uk: string }).uk}
							</option>
						))}
					</select>
				</div>

				<div className='flex flex-col gap-4'>
					<div className='flex items-center justify-between'>
						<label>Додаткова інформація</label>
						<button
							type='button'
							onClick={addProductInfo}
							className='flex items-center gap-2 text-blue-600 hover:text-blue-800'
						>
							<PlusIcon size={16} />
							Додати поле
						</button>
					</div>
					{fields.map((field, index) => (
						<div
							key={field.id}
							className='flex items-center gap-4'
						>
							<div className='flex-1'>
								<input
									placeholder='Назва поля'
									className='border border-gray-200 rounded-md p-2 w-full'
									defaultValue={field.key}
									{...register(`productInfo.${index}.key`)}
								/>
							</div>
							<div className='flex-1'>
								<input
									placeholder='Значення'
									className='border border-gray-200 rounded-md p-2 w-full'
									defaultValue={field.value}
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

				<div className='flex flex-col gap-2'>
					<label htmlFor='description'>Опис</label>
					<textarea
						id='description'
						defaultValue={product.description}
						placeholder='Опишіть товар детально...'
						className='border border-gray-200 rounded-md p-2'
						{...register('description')}
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
