import { useMoveProductDown } from '@/hooks/useProducts'
import { ChevronDownIcon } from 'lucide-react'

export function AdminProductMoveDown({ productId }: { productId: number }) {
	const { mutateAsync: moveProductDown, isPending } = useMoveProductDown()

	return (
		<button
			onClick={async () => {
				try {
					await moveProductDown({ id: productId })
				} catch {}
			}}
			disabled={isPending}
			className='p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
			title='Опустити товар в списку'
		>
			<ChevronDownIcon />
		</button>
	)
}
