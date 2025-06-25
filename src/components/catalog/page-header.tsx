import * as motion from 'framer-motion/client'
import { X } from 'lucide-react'
import Link from 'next/link'

interface PageHeaderProps {
	title: string
	search?: string
	clearSearchUrl: string
}

export const PageHeader = ({ title, search, clearSearchUrl }: PageHeaderProps) => (
	<div className='flex items-center gap-4'>
		<motion.h1
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.7, ease: 'anticipate' }}
			className='text-4xl uppercase tracking-wide'
		>
			{title} {search?.length && `- "${search}"`}
		</motion.h1>
		{search?.length && (
			<Link
				href={clearSearchUrl}
				className='text-sm text-gray-500'
			>
				<X color='#121212' />
			</Link>
		)}
	</div>
)
