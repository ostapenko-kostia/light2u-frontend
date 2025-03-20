'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { useUpdateProduct } from '@/hooks/useProducts'
import { Category, Product } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { EditIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	name?: string
	price?: number
	images: FileList
	description?: string
	categorySlug?: string
	materials?: string
	dimensions?: string
	weight?: string
	power?: string
	voltage?: number
	bulb?: string
	bulbColor?: string
	bulbType?: string
}

interface Props {
	categories: Category[] | undefined
	product: Product
}

export function AdminProductEdit({ categories, product }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { register, handleSubmit, setValue, watch } = useForm<Form>()
	const { mutateAsync: editFunc, isPending, isSuccess, isError } = useUpdateProduct()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	const edit = async (data: Form) => {
		await editFunc({
			id: product.id,
			data
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
					<label htmlFor='images'>Зображення</label>
					<input
						type='file'
						multiple
						accept='image/*'
						{...register('images')}
						className='border border-gray-200 rounded-md p-2'
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
								{(category.name as any).uk}
							</option>
						))}
					</select>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='materials'>Матеріали</label>
					<input
						id='materials'
						defaultValue={product.materials}
						placeholder='Наприклад: Метал, Кристал, Скло'
						className='border border-gray-200 rounded-md p-2'
						{...register('materials')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='dimensions'>Розміри</label>
					<input
						id='dimensions'
						defaultValue={product.dimensions}
						placeholder='Наприклад: 60x60x40 см'
						className='border border-gray-200 rounded-md p-2'
						{...register('dimensions')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='weight'>Вага</label>
					<input
						id='weight'
						defaultValue={product.weight}
						placeholder='Наприклад: 2.5 кг'
						className='border border-gray-200 rounded-md p-2'
						{...register('weight')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='power'>Потужність</label>
					<input
						id='power'
						defaultValue={product.power}
						placeholder='Наприклад: 60W'
						className='border border-gray-200 rounded-md p-2'
						{...register('power')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='voltage'>Напруга</label>
					<input
						id='voltage'
						type='number'
						defaultValue={product.voltage}
						placeholder='Наприклад: 220'
						className='border border-gray-200 rounded-md p-2'
						{...register('voltage', { valueAsNumber: true })}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='bulb'>Лампочка</label>
					<input
						id='bulb'
						defaultValue={product.bulb}
						placeholder='Наприклад: E27'
						className='border border-gray-200 rounded-md p-2'
						{...register('bulb')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='bulbColor'>Колір лампочки</label>
					<input
						id='bulbColor'
						defaultValue={product.bulbColor}
						placeholder='Наприклад: Теплий білий'
						className='border border-gray-200 rounded-md p-2'
						{...register('bulbColor')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='bulbType'>Тип лампочки</label>
					<input
						id='bulbType'
						defaultValue={product.bulbType}
						placeholder='Наприклад: LED'
						className='border border-gray-200 rounded-md p-2'
						{...register('bulbType')}
					/>
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
