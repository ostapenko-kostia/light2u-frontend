'use client'

import { Dialog } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreateProduct } from '@/hooks/useProducts'
import { ISecondLevelCategory } from '@/typing/interfaces'
import { ArrowDownIcon, ArrowUpIcon, Loader2, PlusCircleIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

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
	quantity: number
}

interface Props {
	category: ISecondLevelCategory | undefined
	locale: string
}

export function AdminProductCreate({ category, locale }: Props) {
	const { register, handleSubmit, setValue, control, reset } = useForm<Form>({
		defaultValues: {
			productInfo: []
		}
	})
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'productInfo'
	})
	const { mutateAsync: createFunc, isPending } = useCreateProduct()

	useEffect(() => {
		setValue('locale', locale)
		setValue('categorySlug', category!.slug)
	}, [locale, category, setValue])

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
				<button className='min-h-[88px] w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300'>
					<PlusCircleIcon
						size={24}
						className='text-gray-400'
					/>
				</button>
			}
		>
			<form
				className='bg-white rounded-md h-min flex flex-col gap-4 w-full px-2 sm:px-4'
				onSubmit={handleSubmit(async data => {
					try {
						await create(data)
						reset()
					} catch {}
				})}
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
					<Label htmlFor='quantity'>Кількість на складі</Label>
					<Input
						id='quantity'
						type='number'
						placeholder='Наприклад: 100'
						className='border-gray-200'
						{...register('quantity', { valueAsNumber: true })}
					/>
				</div>

				<div className='flex flex-col gap-4'>
					<div className='flex flex-col items-start gap-2'>
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
					<div className='space-y-2'>
						{fields.map((field, index) => (
							<div
								key={field.id}
								className='flex flex-col sm:flex-row items-start sm:items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-200'
							>
								<div className='flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-start'>
									<div className='flex items-center gap-1'>
										<button
											type='button'
											onClick={() => moveUp(index)}
											disabled={index === 0}
											className='p-1 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
										>
											<ArrowUpIcon size={16} />
										</button>
										<button
											type='button'
											onClick={() => moveDown(index)}
											disabled={index === fields.length - 1}
											className='p-1 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
										>
											<ArrowDownIcon size={16} />
										</button>
									</div>
									<button
										type='button'
										onClick={() => removeProductInfo(index)}
										className='p-1 hover:bg-gray-200 rounded-full transition-colors text-red-600 hover:text-red-800 sm:hidden'
										disabled={fields.length === 1}
									>
										<Trash2Icon size={16} />
									</button>
								</div>
								<div className='flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-2'>
									<Input
										placeholder='Назва поля'
										className='border-gray-200'
										{...register(`productInfo.${index}.key`)}
									/>
									<Input
										placeholder='Значення'
										className='border-gray-200'
										{...register(`productInfo.${index}.value`)}
									/>
								</div>
								<button
									type='button'
									onClick={() => removeProductInfo(index)}
									className='p-1 hover:bg-gray-200 rounded-full transition-colors text-red-600 hover:text-red-800 hidden sm:block'
									disabled={fields.length === 1}
								>
									<Trash2Icon size={16} />
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
					className='bg-gray-800 text-white w-min px-12 py-2 rounded-md mx-auto hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
					disabled={isPending}
				>
					{isPending ? <Loader2 className='animate-spin' /> : 'Створити'}
				</button>
			</form>
		</Dialog>
	)
}
