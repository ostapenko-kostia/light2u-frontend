'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCreateProduct } from '@/hooks/useProducts'
import { Category } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { PlusCircleIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Form {
	name: string
	price: number
	images: FileList
	description: string
	categorySlug: string
	materials: string
	dimensions: string
	weight: string
	power: string
	voltage: number
	bulb: string
	bulbColor: string
	bulbType: string
}

interface Props {
	categories: Category[] | undefined
}

export function AdminProductCreate({ categories }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { register, handleSubmit, setValue, watch } = useForm<Form>()
	const queryClient = useQueryClient()
	const { mutateAsync: createFunc, isPending, isSuccess, isError } = useCreateProduct()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

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

	const handleCategoryChange = (value: string) => {
		setValue('categorySlug', value)
	}

	return (
		<Dialog
			title='Створити товар'
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
				className='mx-auto bg-white rounded-md px-4 h-min flex flex-col gap-4 w-[90%]'
				onSubmit={handleSubmit(data => createFunc(data))}
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

				<div className='flex flex-col gap-2'>
					<Label htmlFor='categorySlug'>Категорія</Label>
					<Select
						id='categorySlug'
						onChange={e => handleCategoryChange(e.target.value)}
						className='border-gray-200'
					>
						<option value=''>Виберіть категорію</option>
						{categories?.map(category => (
							<option
								key={category.id}
								value={category.slug}
							>
								{(category.name as any).ua}
							</option>
						))}
					</Select>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='materials'>Матеріали</Label>
					<Input
						id='materials'
						placeholder='Наприклад: Метал, Кристал, Скло'
						className='border-gray-200'
						{...register('materials')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='dimensions'>Розміри</Label>
					<Input
						id='dimensions'
						placeholder='Наприклад: 60x60x40 см'
						className='border-gray-200'
						{...register('dimensions')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='weight'>Вага</Label>
					<Input
						id='weight'
						placeholder='Наприклад: 2.5 кг'
						className='border-gray-200'
						{...register('weight')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='power'>Потужність</Label>
					<Input
						id='power'
						placeholder='Наприклад: 60W'
						className='border-gray-200'
						{...register('power')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='voltage'>Напруга</Label>
					<Input
						id='voltage'
						type='number'
						placeholder='Наприклад: 220'
						className='border-gray-200'
						{...register('voltage', { valueAsNumber: true })}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='bulb'>Лампочка</Label>
					<Input
						id='bulb'
						placeholder='Наприклад: E27'
						className='border-gray-200'
						{...register('bulb')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='bulbColor'>Колір лампочки</Label>
					<Input
						id='bulbColor'
						placeholder='Наприклад: Теплий білий'
						className='border-gray-200'
						{...register('bulbColor')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='bulbType'>Тип лампочки</Label>
					<Input
						id='bulbType'
						placeholder='Наприклад: LED'
						className='border-gray-200'
						{...register('bulbType')}
					/>
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
