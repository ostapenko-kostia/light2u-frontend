'use client'

import { Dialog } from '@/components/ui/dialog'
import { useEditText } from '@/hooks/useText'
import { ITextField } from '@/typing/interfaces'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
	text: ITextField
}

interface Form {
	text: string
}

function AdminEditTextComponent({ text }: Props) {
	const { register, handleSubmit, reset } = useForm<Form>({
		defaultValues: {
			text: text.text
		}
	})
	const { mutateAsync: editFunc, isPending } = useEditText()

	useEffect(() => {
		reset({
			text: text.text
		})
	}, [text, reset])

	return (
		<Dialog
			title='Змінити текстове поле'
			trigger={<button className='text-blue-600 hover:text-blue-900'>Редагувати</button>}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-8'
				onSubmit={handleSubmit(async data => {
					await editFunc({
						id: Number(text.id),
						text: data.text ?? undefined
					})
					reset()
				})}
			>
				<div className='flex items-start flex-col gap-3'>
					<label
						htmlFor='text'
						className='flex items-center gap-2'
					>
						Назва
					</label>
					<input
						className='w-full rounded-md border border-gray-500 bg-white px-5 py-3 text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder={text.text}
						id='text'
						{...register('text', { required: true })}
					/>
				</div>
				<button
					type='submit'
					className='bg-gray-800 text-white w-min px-12 py-2 rounded-md mx-auto hover:bg-gray-700'
					disabled={isPending}
				>
					{isPending ? <Loader2 className='animate-spin' /> : 'Зберегти'}
				</button>
			</form>
		</Dialog>
	)
}

export const AdminEditText = dynamic(() => Promise.resolve(AdminEditTextComponent), { ssr: false })
