import { Slide } from '@prisma/client'
import { AdminSlidesList } from './admin-slides-list'

interface Props {
	slides: Slide[] | undefined
}

export function AdminSlidesTab({ slides }: Props) {
	return (
		<div className='p-4 animate-opacity-1'>
			<h2 className='text-2xl font-semibold'>Слайди</h2>
			<AdminSlidesList slides={slides} />
		</div>
	)
}
