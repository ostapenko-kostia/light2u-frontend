'use client'

import { Dialog } from '@/components/ui/dialog'
import { useDeleteSlide } from '@/hooks/useSlides'
import { Loader2, Trash2Icon } from 'lucide-react'

interface Props {
	id: number
}

export function AdminDeleteSlide({ id }: Props) {
	const { mutateAsync: deleteFunc, isPending } = useDeleteSlide()

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
				<span className='text-lg'>Ви впевнені, що хочете видалити цей слайд?</span>
				<div className='flex items-center gap-4 ml-auto'>
					<button
						onClick={async () => {
							try {
								await deleteFunc(id)
							} catch {}
						}}
						className='bg-gray-800 text-white w-min px-12 py-2 self-end rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
						disabled={isPending}
					>
						{isPending ? <Loader2 className='animate-spin' /> : 'Так'}
					</button>
				</div>
			</div>
		</Dialog>
	)
}
