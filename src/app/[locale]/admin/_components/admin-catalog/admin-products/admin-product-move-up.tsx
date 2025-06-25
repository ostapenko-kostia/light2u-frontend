import { useMoveProductUp } from '@/hooks/useProducts'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export function AdminProductMoveUp({ productId }: { productId: number }) {
	const { mutate: moveProductUp, isPending, isSuccess, isError } = useMoveProductUp()
	const queryClient = useQueryClient()
	const [loadingToastId, setLoadingToastId] = useState<string | null>(null)

	const moveUp = () => {
		moveProductUp({ id: productId })
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
			onClick={moveUp}
			className='p-2 hover:bg-gray-100 rounded-md transition-colors'
			title='Підняти товар в списку'
		>
			<ChevronUpIcon />
		</button>
	)
}
