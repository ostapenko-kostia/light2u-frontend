'use client'

import { Dialog } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateObject } from '@/hooks/useObjects'
import { IObject } from '@/typing/interfaces'
import { EditIcon, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Form {
	images: FileList
	name: string
	description: string
	city: string
	address: string
}

interface Props {
	object: IObject
}

export function AdminObjectEdit({ object }: Props) {
	const { register, handleSubmit, setValue, reset } = useForm<Form>({
		defaultValues: {
			images: undefined,
			name: object.name,
			description: object.description,
			city: object.city,
			address: object.address
		}
	})
	const { mutateAsync: editFunc, isPending } = useUpdateObject()

	useEffect(
		() =>
			reset({
				images: undefined,
				name: object.name,
				description: object.description,
				city: object.city,
				address: object.address
			}),
		[object, reset]
	)

	const edit = async (data: Form) => {
		await editFunc({
			id: object.id,
			data: {
				images: data.images ?? object.images,
				name: data.name ?? object.name,
				description: data.description ?? object.description,
				city: data.city ?? object.city,
				address: data.address ?? object.address
			}
		})
	}

	return (
		<Dialog
			title="Змінити об'єкт"
			trigger={
				<button>
					<EditIcon />
				</button>
			}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-4'
				onSubmit={handleSubmit(async data => {
					try {
						await edit(data)
					} catch {}
				})}
			>
				<div>
					<label
						htmlFor='images'
						className='flex items-center gap-2'
					>
						Зображення
					</label>
					<FileInput
						className='w-full appearance-none rounded-md border border-[#ccc] bg-white text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
						multiple
						onChange={files => {
							if (files) {
								setValue('images', files)
							}
						}}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='name'
						className='flex items-center gap-2'
					>
						Назва
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder="Об'єкт"
						id='name'
						{...register('name', { required: true })}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='city'
						className='flex items-center gap-2'
					>
						Місто
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder='Київ'
						id='city'
						{...register('city', { required: true })}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='address'
						className='flex items-center gap-2'
					>
						Адреса
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder='вул. Хрещатик, 1'
						id='address'
						{...register('address', { required: true })}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='url'
						className='flex items-center gap-2'
					>
						Опис
					</label>
					<Textarea
						className='w-full min-h-[200px] rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm resize-y focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						required
						placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero similique, quam harum autem voluptatem natus repellendus voluptate, unde, error ducimus animi qui accusantium dolorum molestiae iusto cum minus impedit. Facere.'
						id='description'
						{...register('description', { required: true })}
					/>
				</div>

				<button
					type='submit'
					className='bg-gray-800 text-white w-min px-12 py-2 rounded-md mx-auto hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
					disabled={isPending}
				>
					{isPending ? <Loader2 className='animate-spin' /> : 'Змінити'}
				</button>
			</form>
		</Dialog>
	)
}
