'use client'

import { ProductCard } from '@/components/layout/product-card'
import type { FirstLevelCategory, Product, ProductInfo, SecondLevelCategory } from '@prisma/client'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { Fragment, useState } from 'react'
import { AdminProductCreate } from './admin-product-create'
import { AdminProductDelete } from './admin-product-delete'
import { AdminProductDuplicate } from './admin-product-duplicate'
import { AdminProductEdit } from './admin-product-edit'

type ProductWithInfo = Product & {
	info: ProductInfo[]
}

interface Props {
	products: ProductWithInfo[] | undefined
	firstLevelCategories: FirstLevelCategory[] | undefined
	secondLevelCategories: SecondLevelCategory[] | undefined
}

export function AdminProductsTab({ products, firstLevelCategories, secondLevelCategories }: Props) {
	const [currentLocale, setCurrentLocale] = useState<'uk' | 'ru'>('uk')
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

	const toggleCategory = (slug: string) => {
		setExpandedCategories(prev => {
			const newSet = new Set(prev)
			if (newSet.has(slug)) {
				newSet.delete(slug)
			} else {
				newSet.add(slug)
			}
			return newSet
		})
	}

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

			<div className='space-y-4'>
				{firstLevelCategories?.map(firstCategory => {
					const secondCategories = secondLevelCategories?.filter(
						cat => cat.parentCategorySlug === firstCategory.slug
					)
					const categoryProducts = filteredProducts?.filter(product =>
						secondCategories?.some(cat => cat.slug === product.categorySlug)
					)

					return (
						<Fragment key={firstCategory.id}>
							<div
								className='bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 flex items-center justify-between'
								onClick={() => toggleCategory(firstCategory.slug)}
							>
								<div className='flex items-center gap-2'>
									{expandedCategories.has(firstCategory.slug) ? (
										<ChevronDownIcon size={20} />
									) : (
										<ChevronRightIcon size={20} />
									)}
									<span className='font-medium'>{(firstCategory.name as { uk: string }).uk}</span>
								</div>
								<span className='text-sm text-gray-500'>
									{categoryProducts?.length || 0} товарів
								</span>
							</div>

							{expandedCategories.has(firstCategory.slug) && (
								<div className='ml-8 space-y-4'>
									{secondCategories?.map(secondCategory => {
										const categoryProducts = filteredProducts?.filter(
											product => product.categorySlug === secondCategory.slug
										)

										return (
											<div
												key={secondCategory.id}
												className='bg-white p-4 rounded-lg border border-gray-100'
											>
												<div className='flex items-center justify-between mb-4'>
													<h3 className='font-medium'>
														{(secondCategory.name as { uk: string }).uk}
													</h3>
													<span className='text-sm text-gray-500'>
														{categoryProducts?.length || 0} товарів
													</span>
												</div>
												<div className='grid grid-cols-3 max-sm:grid-cols-2 max-[450px]:!grid-cols-1 gap-4'>
													{categoryProducts?.map(product => (
														<div
															className='relative max-[500px]:pr-0'
															key={product.id}
														>
															<div className='absolute w-1/2 z-10 flex items-center justify-around max-[500px]:gap-4 max-[500px]:justify-between p-0 right-0 bottom-0 rounded-md'>
																<AdminProductEdit
																	product={product}
																	categories={secondCategories}
																/>
																<AdminProductDuplicate
																	productId={product.id}
																	productName={product.name}
																/>
																<AdminProductDelete
																	productId={product.id}
																	productName={product.name}
																/>
															</div>
															<ProductCard product={product} />
														</div>
													))}
													<AdminProductCreate
														category={secondCategory}
														locale={currentLocale}
													/>
												</div>
											</div>
										)
									})}
								</div>
							)}
						</Fragment>
					)
				})}
			</div>
		</div>
	)
}
