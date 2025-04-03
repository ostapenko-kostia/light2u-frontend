'use client'

import { useDuplicateProduct } from '@/hooks/useProducts'
import { useQueryClient } from '@tanstack/react-query'
import { CopyIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
	productId: number
	productName: string
}

export function AdminProductDuplicate({ productId, productName }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const { mutateAsync: duplicateFunc, isPending, isSuccess, isError } = useDuplicateProduct()

	const duplicate = async () => {
		await duplicateFunc({ id: productId })
	}

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває дублювання...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			toast.success('Товар успішно дубльовано')
		}
		if (isError) {
			loadingToastId && toast.dismiss(loadingToastId)
			toast.error('Помилка при дублюванні товару')
		}
	}, [isPending, isSuccess, isError])

	return (
		<button
			onClick={duplicate}
			className='p-2 hover:bg-gray-100 rounded-md transition-colors'
			title='Дублювати товар'
		>
			<CopyIcon />
		</button>
	)
}
