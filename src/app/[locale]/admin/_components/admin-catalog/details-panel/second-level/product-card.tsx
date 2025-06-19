import { IProduct } from '@/typing/interfaces'
import Image from 'next/image'
import { AdminProductDuplicate } from '../../admin-products/admin-product-duplicate'
import { AdminProductMoveUp } from '../../admin-products/admin-product-move-up'
import { AdminProductMoveDown } from '../../admin-products/admin-product-move-down'

interface ProductCardProps {
	product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<div
			key={product.id}
			className='bg-white p-3 rounded shadow-sm flex items-center gap-3 hover:bg-gray-50 max-sm:flex-col'
		>
			{product.images?.length > 0 && (
				<div className='w-16 h-16 relative max-sm:w-full max-sm:aspect-square max-sm:h-auto'>
					<Image
						src={product.images[0]}
						alt={product.name}
						fill
						className='object-cover rounded'
					/>
				</div>
			)}
			<div className='flex-grow max-sm:self-start'>
				<div className='font-medium'>{product.name}</div>
				<div className='text-xs text-gray-500'>Slug: {product.slug}</div>
			</div>
			<div className='text-right mr-4 max-sm:self-start'>
				<div className='font-bold'>{product.price} ₴</div>
				<div className='text-xs'>{product.quantity} шт</div>
			</div>
			<div className='flex items-center gap-1 max-sm:self-start'>
				<AdminProductDuplicate
					productId={product.id}
					productName={product.name}
				/>
				<AdminProductMoveUp productId={product.id} />
				<AdminProductMoveDown productId={product.id} />
			</div>
		</div>
	)
}
