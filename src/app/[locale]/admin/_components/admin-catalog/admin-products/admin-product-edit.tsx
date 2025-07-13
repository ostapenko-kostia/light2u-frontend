'use client'

import { Dialog } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { useUpdateProduct } from '@/hooks/useProducts'
import { IProduct, IProductInfo } from '@/typing/interfaces'
import { ArrowDownIcon, ArrowUpIcon, EditIcon, Loader2, PlusIcon, Trash2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

interface Form {
	name?: string
	price?: number
	images: FileList
	description?: string
	locale?: string
	productInfo: { key: string; value: string }[]
	quantity?: number
}

interface Props {
	product: IProduct & { info: IProductInfo[] }
}

export function AdminProductEdit({ product }: Props) {
	const { register, handleSubmit, setValue, control, reset } = useForm<Form>({
		defaultValues: {
			name: product.name,
			price: product.price,
			description: product.description,
			quantity: product.quantity ?? 0,
			productInfo: product.info.map(info => ({
				key: info.key,
				value: info.value
			}))
		}
	})
	const { fields, append, remove, move, replace } = useFieldArray({
		control,
		name: 'productInfo'
	})
	const { mutateAsync: editFunc, isPending } = useUpdateProduct()

	useEffect(() => {
		reset({
			name: product.name,
			price: product.price,
			description: product.description,
			quantity: product.quantity ?? 0,
			productInfo: product.info.map(info => ({
				key: info.key,
				value: info.value
			}))
		})
		replace(
			product.info.map(info => ({
				key: info.key,
				value: info.value
			}))
		)
	}, [product, reset, replace])

	const edit = async (data: Form) => {
		data.locale = product.locale
		await editFunc({
			id: product.id,
			data: {
				...data,
				productInfo:
					typeof data.productInfo === 'string'
						? JSON.parse(data.productInfo)
						: data.productInfo
								.filter(info => info.key && info.value)
								.map((info, index) => ({
									...info,
									order: index
								}))
			}
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
			title='Змінити інформацію про товар'
			trigger={
				<button>
					<EditIcon />
				</button>
			}
		>
			<form
				className='bg-white rounded-md h-min w-full flex flex-col gap-4 px-2 sm:px-4'
				onSubmit={handleSubmit(async data => {
					try {
						await edit(data)
					} catch {}
				})}
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
						placeholder='Наприклад: 2500'
						className='border border-gray-200 rounded-md p-2'
						{...register('price', { valueAsNumber: true })}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='quantity'>Кількість</label>
					<input
						id='quantity'
						type='number'
						placeholder='Наприклад: 2500'
						className='border border-gray-200 rounded-md p-2'
						{...register('quantity', { valueAsNumber: true })}
					/>
				</div>

				<div className='flex flex-col gap-4'>
					<div className='flex flex-col items-start gap-2'>
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
									<input
										placeholder='Назва поля'
										className='border border-gray-200 rounded-md p-2'
										{...register(`productInfo.${index}.key`)}
									/>
									<input
										placeholder='Значення'
										className='border border-gray-200 rounded-md p-2'
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
					<label htmlFor='description'>Опис</label>
					<textarea
						id='description'
						placeholder='Опишіть товар детально...'
						className='border border-gray-200 rounded-md p-2 min-h-[150px]'
						{...register('description')}
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
