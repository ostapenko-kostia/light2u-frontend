import { FirstLevelCategory, SecondLevelCategory } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
	category: FirstLevelCategory | SecondLevelCategory
	locale: string
	href: string
}

export function CategoryCard({ category, locale, href }: Props) {
	return (
		<Link
			href={href}
			className='group relative aspect-square overflow-hidden rounded-lg bg-gray-100'
		>
			<Image
				src={category.image}
				alt={(category.name as any)[locale]}
				width={400}
				height={400}
				className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
			/>
			<div className='absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 group-hover:bg-black/50'>
				<h3 className='text-center text-xl font-medium text-white'>
					{(category.name as any)[locale]}
				</h3>
			</div>
		</Link>
	)
}
