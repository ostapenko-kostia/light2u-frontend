'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { useEditText } from '@/hooks/useText'
import { ITextField } from '@/typing/interfaces'
import { useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
	text: ITextField
}

interface Form {
	text: string
}

function AdminEditTextComponent({ text }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { register, handleSubmit, watch, setValue } = useForm<Form>()
	const queryClient = useQueryClient()
	const { mutateAsync: editFunc, isPending, isSuccess, isError } = useEditText()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває зміна...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['texts get'] })
			toast.success('Текст успішно змінено!')
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	const edit = async (data: Form) => {
		await editFunc({
			id: Number(text.id),
			text: data.text ?? undefined
		})
	}

	return (
		<Dialog
			title='Змінити текстове поле'
			trigger={<button className='text-blue-600 hover:text-blue-900'>Редагувати</button>}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-8'
				onSubmit={handleSubmit(data => edit(data))}
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
						defaultValue={text.text}
						id='text'
						{...register('text', { required: true })}
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

export const AdminEditText = dynamic(() => Promise.resolve(AdminEditTextComponent), { ssr: false })
