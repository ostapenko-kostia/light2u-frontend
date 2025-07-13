'use client'

import { Dialog } from '@/components/ui/dialog'
import { useDeleteProduct } from '@/hooks/useProducts'
import { Loader2, Trash2Icon } from 'lucide-react'

interface Props {
	productName: string
	productId: number
}

export function AdminProductDelete({ productName, productId }: Props) {
	const { mutateAsync: deleteFunc, isPending } = useDeleteProduct()

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
						onClick={async () => {
							try {
								await deleteFunc({ id: productId })
							} catch {}
						}}
						disabled={isPending}
						className='bg-gray-800 text-white rounded-md px-6 py-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
					>
						{isPending ? <Loader2 className='animate-spin' /> : 'Видалити'}
					</button>
				</div>
			</div>
		</Dialog>
	)
}
