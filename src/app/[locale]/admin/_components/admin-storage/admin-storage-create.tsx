'use client'

import { Dialog } from '@/components/ui/dialog'
import { FileInput } from '@/components/ui/file-input'
import { useCreateFile } from '@/hooks/useStorage'
import { Loader2, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

export function CreateFile() {
	const { handleSubmit, setValue } = useForm<{ file: FileList }>()
	const { mutateAsync: createFunc, isPending } = useCreateFile()

	return (
		<Dialog
			title='Завантажити файл'
			trigger={
				<button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2'>
					<PlusIcon
						color='#fff'
						size={20}
					/>{' '}
					Завантажити файл
				</button>
			}
		>
			<form
				className='bg-white rounded-md p-4 w-full h-min flex flex-col gap-8'
				onSubmit={handleSubmit(async data => {
					try {
						await createFunc(data.file)
					} catch {}
				})}
			>
				<FileInput
					label='Файл'
					multiple={false}
					accept='image/*'
					onChange={file => {
						if (file) {
							setValue('file', file)
						}
					}}
				/>

				<button
					type='submit'
					className='bg-gray-800 text-white w-min px-12 py-2 self-end rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
					disabled={isPending}
				>
					{isPending ? <Loader2 className='animate-spin' /> : 'Завантажити'}
				</button>
			</form>
		</Dialog>
	)
}
