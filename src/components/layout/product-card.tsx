import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from '@/typing/interfaces'

interface ProductCardProps {
	product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Link
			href={`/${product.locale}/product/${product.slug}`}
			className='contents'
		>
			<article className='flex flex-col gap-4 w-full group'>
				<div className='overflow-hidden w-full h-auto rounded-xl'>
					<Image
						src={product.images[0]}
						alt={product.name}
						width={500}
						height={500}
						className='w-full aspect-square object-cover rounded-xl group-hover:scale-105 group-hover:brightness-90 transition-all duration-1000'
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<h3 className='font-light group-hover:underline underline-offset-4'>{product.name}</h3>
					<p className='text-lg font-medium'>₴{product.price} грн</p>
				</div>
			</article>
		</Link>
	)
}
