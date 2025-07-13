import { useMoveProductUp } from '@/hooks/useProducts'
import { ChevronUpIcon } from 'lucide-react'

export function AdminProductMoveUp({ productId }: { productId: number }) {
	const { mutateAsync: moveProductUp, isPending } = useMoveProductUp()

	return (
		<button
			onClick={async () => {
				try {
					await moveProductUp({ id: productId })
				} catch {}
			}}
			disabled={isPending}
			className='p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
			title='Підняти товар в списку'
		>
			<ChevronUpIcon />
		</button>
	)
}
