'use client'

import { useDuplicateProduct } from '@/hooks/useProducts'
import { CopyIcon } from 'lucide-react'

interface Props {
	productId: number
	productName: string
}

export function AdminProductDuplicate({ productId, productName }: Props) {
	const { mutateAsync: duplicate, isPending } = useDuplicateProduct()

	return (
		<button
			disabled={isPending}
			onClick={async () => {
				try {
					await duplicate({ id: productId })
				} catch {}
			}}
			className='p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
			title='Дублювати товар'
		>
			<CopyIcon />
		</button>
	)
}
