import { Gallery } from '@prisma/client'
import { AdminDeleteGallery } from './admin-delete-gallery'
import Image from 'next/image'
import { AdminSlideCreate } from './admin-create-gallery'

interface Props {
	galleries: Gallery[] | undefined
}

export function AdminGalleryList({ galleries }: Props) {
	return (
		<div className='grid grid-cols-3 mt-5 w-full gap-10 max-xl:grid-cols-3 max-md:grid-cols-2 max-[480px]:!grid-cols-1'>
			{galleries?.map((gallery, index) => (
				<div
					className='relative'
					key={gallery.id}
				>
					<div className='absolute z-10 bg-white flex items-center gap-3 justify-center p-2 right-2 rounded-b-md'>
						<AdminDeleteGallery id={gallery.id} />
					</div>
					<div className='relative w-full aspect-square'>
						<Image
							src={gallery.image}
							alt={`Картинка ${index + 1}`}
							fill
							sizes='100%, 100%'
							className='object-cover rounded-lg'
						/>
					</div>
				</div>
			))}
			<AdminSlideCreate />
		</div>
	)
}
