'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { useDeleteProduct } from '@/hooks/useProducts'
import { useQueryClient } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
	productName: string
	productId: number
}

export function AdminProductDelete({ productName, productId }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { mutateAsync: deleteFunc, isPending, isSuccess, isError } = useDeleteProduct()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває видалення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	return (
		<Dialog
			title='Видалити'
			className='flex items-center'
			trigger={
				<button>
					<Trash2Icon />
				</button>
			}
		>
			<div className='w-full flex items-start gap-4 flex-col'>
				<span className='text-lg'>Ви впевнені, що хочете видалити {productName}?</span>
				<div className='flex items-center gap-4 ml-auto'>
					<button
						onClick={() => deleteFunc({ id: productId })}
						className='bg-gray-800 text-white rounded-md px-6 py-2 hover:bg-gray-700'
					>
						Видалити
					</button>
				</div>
			</div>
		</Dialog>
	)
}
