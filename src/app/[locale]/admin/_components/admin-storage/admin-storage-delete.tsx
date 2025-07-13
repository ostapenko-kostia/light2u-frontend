'use client'

import { Dialog } from '@/components/ui/dialog'
import { useDeleteFile } from '@/hooks/useStorage'
import { Loader2 } from 'lucide-react'
import { IFile } from './admin-storage.typing'

interface Props {
	file: IFile
}

export function DeleteFile({ file }: Props) {
	const { mutateAsync: deleteFunc, isPending } = useDeleteFile()

	return (
		<Dialog
			title='Видалити файл'
			trigger={<button className='text-red-600 hover:text-red-900 ml-4'>Видалити</button>}
		>
			<div className='bg-white rounded-md w-full h-min flex flex-col gap-8'>
				<p>Ви дійсно хочете видалити файл {file.title}?</p>
				<button
					type='submit'
					className='bg-gray-800 text-white w-min self-end rounded-md px-6 py-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
					disabled={isPending}
					onClick={async () => {
						try {
							await deleteFunc(file.title)
						} catch {}
					}}
				>
					{isPending ? <Loader2 className='animate-spin' /> : 'Видалити'}
				</button>
			</div>
		</Dialog>
	)
}
