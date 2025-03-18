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
			<div className='grid grid-cols-3 max-sm:grid-cols-2 max-[450px]:!grid-cols-1 w-full gap-10'>
				{products ? (
					<>
						{products.map(product => {
							const categoryName =
								(categories?.find(category => category.slug === product.categorySlug)?.name as any)
									?.ua ?? 'Без категорії'
							return (
								<div
									className='relative max-[500px]:pr-0'
									key={product.id}
								>
									<div className='absolute w-full z-10 bg-[#fffffffd] flex border items-center justify-around max-[500px]:gap-4 max-[500px]:justify-between p-2 left-0 top-0 rounded-md'>
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
