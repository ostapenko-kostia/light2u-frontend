'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { useAdminDelete } from '@/hooks/useAdmin'
import { IAdmin } from '@/typing/interfaces'
import { useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
	admins: IAdmin[]
	admin: IAdmin
}

export function DeleteAdmin({ admin, admins }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { mutateAsync: deleteFunc, isPending, isSuccess, isError } = useAdminDelete()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває видалення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['admins get'] })
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	return (
		<Dialog
			title='Видалити адміна'
			trigger={
				<button
					className='ml-4 text-red-600 hover:text-red-900 disabled:text-red-200 disabled:cursor-not-allowed'
					disabled={admins.length === 1 || admin.login === 'ostapenkokpersonal@gmail.com'}
				>
					Видалити
				</button>
			}
		>
			<div className='flex flex-col items-start gap-6 w-full'>
				<span className='text-lg'>Ви впевнені, що хочете видалити {admin.login}?</span>
				<button
					type='submit'
					className='bg-gray-800 text-white w-min self-end rounded-md px-6 py-2 hover:bg-gray-700'
					onClick={() => deleteFunc({ id: admin.id })}
				>
					Так
				</button>
			</div>
		</Dialog>
	)
}
