'use client'

import type { Category, Product } from '@prisma/client'
import { AdminProductCreate } from './admin-product-create'
import { AdminProductDelete } from './admin-product-delete'
import { AdminProductEdit } from './admin-product-edit'
import { ProductCard } from '@/components/layout/product-card'
import { AdminProductInfo } from './admin-product-info'

interface Props {
	products: Product[] | undefined
	categories: Category[] | undefined
}

export function AdminProductsTab({ products, categories }: Props) {
	return (
		<div className='w-full p-4 animate-opacity-1'>
			<h2 className='mb-6 text-2xl font-semibold'>Товари</h2>
			<div className='grid grid-cols-1 w-full gap-10'>
				{products ? (
					<>
						{products.map((product, index) => {
							const categoryName =
								categories?.find(category => category.slug === product.categorySlug)?.name ??
								'Без категорії'
							return (
								<div
									className='relative pr-11 max-[500px]:pr-0'
									key={product.id}
								>
									<div className='absolute h-full z-10 bg-white flex flex-col border-2 items-center justify-between max-[500px]:h-min max-[500px]:gap-4 max-[500px]:justify-center p-2 right-0 rounded-md'>
										<AdminProductInfo
											product={product}
											categoryName={categoryName}
										/>
										<AdminProductEdit
											product={product}
											categories={categories}
										/>
										<AdminProductDelete
											productId={product.id}
											productName={product.name}
										/>
									</div>
									<ProductCard product={product} />
								</div>
							)
						})}
						<AdminProductCreate categories={categories} />
					</>
				) : (
					<p>Отримання товарів з бази даних...</p>
				)}
			</div>
		</div>
	)
}
