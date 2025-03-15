import clsx from 'clsx'
import { SearchIcon } from 'lucide-react'

export function HeaderButtons({ className }: { className?: string }) {
	return (
		<div className={clsx('flex items-center gap-4', className)}>
			<button className='cursor-pointer hover:scale-110'>
				<SearchIcon strokeWidth={1} size={32} />
			</button>
		</div>
	)
}
