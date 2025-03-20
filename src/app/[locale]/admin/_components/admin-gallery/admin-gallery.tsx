import { Gallery } from '@prisma/client'
import { AdminGalleryList } from './admin-gallery-list'

interface Props {
	galleries: Gallery[] | undefined
}

export function AdminGalleryTab({ galleries }: Props) {
	return (
		<div className='p-4 animate-opacity-1'>
			<h2 className='text-2xl font-semibold'>Галерея</h2>
			<AdminGalleryList galleries={galleries} />
		</div>
	)
}
