import { useMoveProductDown } from '@/hooks/useProducts'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function AdminProductMoveDown({ productId }: { productId: number }) {
	const { mutate: moveProductDown, isPending, isSuccess, isError } = useMoveProductDown()
	const queryClient = useQueryClient()
	const [loadingToastId, setLoadingToastId] = useState<string | null>(null)

	const moveDown = () => {
		moveProductDown({ id: productId })
	}

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває переміщення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['products get'] })
			toast.success('Товар успішно переміщено')
		}
		if (isError) {
			loadingToastId && toast.dismiss(loadingToastId)
			toast.error('Помилка при переміщенні товару')
		}
	}, [isPending, isSuccess, isError])

	return (
		<button
			onClick={moveDown}
			className='p-2 hover:bg-gray-100 rounded-md transition-colors'
			title='Опустити товар в списку'
		>
			<ChevronDownIcon />
		</button>
	)
}
