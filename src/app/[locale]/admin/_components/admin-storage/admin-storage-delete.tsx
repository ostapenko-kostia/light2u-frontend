'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { useDeleteFile } from '@/hooks/useStorage'
import { useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IFile } from './admin-storage.typing'

interface Props {
	file: IFile
}

export function DeleteFile({ file }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog
	const queryClient = useQueryClient()
	const { mutateAsync: deleteFunc, isPending, isSuccess, isError } = useDeleteFile()

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває видалення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['storage get'] })
			toast.success('Успішно! Файл буде видалений протягом 5 хвилин', { duration: 3000 })
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	return (
		<Dialog
			title='Видалити файл'
			trigger={<button className='text-red-600 hover:text-red-900 ml-4'>Видалити</button>}
		>
			<div className='bg-white rounded-md w-full h-min flex flex-col gap-8'>
				<p>Ви дійсно хочете видалити файл {file.title}?</p>
				<button
					type='submit'
					className='bg-gray-800 text-white w-min self-end rounded-md px-6 py-2 hover:bg-gray-700'
					onClick={() => deleteFunc(file.title)}
				>
					Видалити
				</button>
			</div>
		</Dialog>
	)
}
