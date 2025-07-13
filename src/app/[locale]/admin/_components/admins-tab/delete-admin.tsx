'use client'

import { Dialog } from '@/components/ui/dialog'
import { useAdminDelete } from '@/hooks/useAdmin'
import { IAdmin } from '@/typing/interfaces'
import { Loader2 } from 'lucide-react'

interface Props {
	admins: IAdmin[]
	admin: IAdmin
}

export function DeleteAdmin({ admin, admins }: Props) {
	const { mutateAsync: deleteFunc, isPending } = useAdminDelete()

	return (
		<Dialog
			title='Видалити адміна'
			trigger={
				<button
					className='ml-4 text-red-600 hover:text-red-900 disabled:text-red-200 disabled:cursor-not-allowed'
					disabled={admins.length === 1 || admin.login === 'ostapenkokpersonal@gmail.com'}
					title={
						admins.length === 1 || admin.login === 'ostapenkokpersonal@gmail.com'
							? 'Цього адміністратора не можна видаляти'
							: ''
					}
				>
					Видалити
				</button>
			}
		>
			<div className='flex flex-col items-start gap-6 w-full'>
				<span className='text-lg'>Ви впевнені, що хочете видалити {admin.login}?</span>
				<button
					type='submit'
					className='bg-gray-800 text-white w-min self-end rounded-md px-6 py-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
					onClick={async () => {
						try {
							await deleteFunc({ id: admin.id })
						} catch {}
					}}
				>
					{isPending ? <Loader2 className='animate-spin' /> : 'Так'}
				</button>
			</div>
		</Dialog>
	)
}
