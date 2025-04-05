'use client'

import { Dialog } from '@/components/ui/dialog'
import { useDeleteGalleryItem } from '@/hooks/useGallery'
import { useQueryClient } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
	id: number
}

export function AdminDeleteGallery({ id }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { mutateAsync: deleteFunc, isPending, isSuccess, isError } = useDeleteGalleryItem()

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває видалення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['gallery get'] })
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
		}
	}, [isPending, isSuccess, isError])

	return (
		<Dialog
			title='Видалити'
			trigger={
				<button>
					<Trash2Icon />
				</button>
			}
		>
			<div className='flex items-start gap-4 flex-col w-full'>
				<span className='text-lg'>Ви впевнені, що хочете видалити це фото?</span>
				<div className='flex items-center gap-4 ml-auto'>
					<button
						onClick={() => deleteFunc(id)}
						className='bg-gray-800 text-white w-min self-end rounded-md px-12 py-2 hover:bg-gray-700'
					>
						Так
					</button>
				</div>
			</div>
		</Dialog>
	)
}
