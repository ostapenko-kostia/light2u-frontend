'use client'

import { ProductCard } from '@/components/layout/product-card'
import type { Category, Product } from '@prisma/client'
import { useState } from 'react'
import { AdminProductCreate } from './admin-product-create'
import { AdminProductDelete } from './admin-product-delete'
import { AdminProductEdit } from './admin-product-edit'
import { AdminProductInfo } from './admin-product-info'

interface Props {
	products: Product[] | undefined
	categories: Category[] | undefined
}

export function AdminProductsTab({ products, categories }: Props) {
	const [currentLocale, setCurrentLocale] = useState<'uk' | 'ru'>('uk')

	// Filter products by locale
	const ukProducts = products?.filter(product => product.locale === 'uk' || !product.locale)
	const ruProducts = products?.filter(product => product.locale === 'ru')

	// Get products based on selected locale
	const filteredProducts = currentLocale === 'uk' ? ukProducts : ruProducts

	return (
		<div className='w-full p-4 animate-opacity-1'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-semibold'>Товари</h2>
				<div className='flex gap-4'>
					<button
						className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
							currentLocale === 'uk'
								? 'text-blue-500 border-b-2 border-blue-500'
								: 'hover:text-blue-400'
						}`}
						onClick={() => setCurrentLocale('uk')}
					>
						Українська
					</button>
					<button
						className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
							currentLocale === 'ru'
								? 'text-blue-500 border-b-2 border-blue-500'
								: 'hover:text-blue-400'
						}`}
						onClick={() => setCurrentLocale('ru')}
					>
						Російська
					</button>
				</div>
			</div>
			<div className='grid grid-cols-3 max-sm:grid-cols-2 max-[450px]:!grid-cols-1 w-full gap-10'>
				{filteredProducts ? (
					<>
						{filteredProducts.map(product => {
							const categoryName =
								(categories?.find(category => category.slug === product.categorySlug)?.name as any)
									?.uk ?? 'Без категорії'
							return (
								<div
									className='relative max-[500px]:pr-0'
									key={product.id}
								>
									<div className='absolute w-1/2 z-10 flex items-center justify-around max-[500px]:gap-4 max-[500px]:justify-between p-0 right-0 bottom-0 rounded-md'>
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
						<AdminProductCreate
							categories={categories}
							locale={currentLocale}
						/>
					</>
				) : (
					<p>Отримання товарів з бази даних...</p>
				)}
			</div>
		</div>
	)
}
