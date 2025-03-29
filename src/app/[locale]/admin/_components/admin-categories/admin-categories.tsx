import { FirstLevelCategory, Product, SecondLevelCategory } from '@prisma/client'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { Fragment, useState } from 'react'
import { AdminCreateFirstLevelCategory } from './admin-create-first-level-category'
import { AdminCreateSecondLevelCategory } from './admin-create-second-level-category'
import { AdminDeleteCategory } from './admin-delete-category'
import { AdminEditCategory } from './admin-edit-categories'

interface Props {
	firstLevelCategories: FirstLevelCategory[] | undefined
	secondLevelCategories: SecondLevelCategory[] | undefined
	products: Product[] | undefined
}

export function AdminCategoriesTab({
	firstLevelCategories,
	secondLevelCategories,
	products
}: Props) {
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

	return (
		<div className='p-4 w-full animate-opacity-1'>
			<div className='flex justify-between items-center mb-6 max-sm:flex-col max-sm:gap-4'>
				<h2 className='text-2xl font-semibold'>Категорії</h2>
				<AdminCreateFirstLevelCategory />
			</div>
			<div className='w-full overflow-x-auto'>
				<div className='min-w-[800px]'>
					<div className='bg-white rounded-lg shadow-sm'>
						<div className='divide-y divide-gray-200'>
							{firstLevelCategories?.map(category => (
								<Fragment key={category.id}>
									<div
										className='flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100'
										onClick={() => toggleCategory(category.slug)}
									>
										<div className='flex items-center gap-4'>
											<div className='flex items-center gap-2'>
												{expandedCategories.has(category.slug) ? (
													<ChevronDownIcon size={16} />
												) : (
													<ChevronRightIcon size={16} />
												)}
												<span className='text-sm text-gray-900 font-medium'>
													{(category.name as { uk: string }).uk}
												</span>
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<AdminEditCategory category={category} />
											<AdminDeleteCategory
												category={category}
												products={products}
												secondLevelCategories={secondLevelCategories}
											/>
										</div>
									</div>
									{expandedCategories.has(category.slug) && (
										<div className='px-4 py-3 bg-gray-50'>
											<div className='flex justify-end mb-4'>
												<AdminCreateSecondLevelCategory parentCategorySlug={category.slug} />
											</div>
											<div className='bg-white rounded-lg shadow-sm'>
												<div className='divide-y divide-gray-100'>
													{secondLevelCategories
														?.filter(secondCat => secondCat.parentCategorySlug === category.slug)
														.map(secondCat => (
															<div
																key={secondCat.id}
																className='flex items-center justify-between px-2 py-2 hover:bg-gray-50'
															>
																<div className='flex items-center gap-4'>
																	<span className='text-sm text-gray-900'>
																		{(secondCat.name as { uk: string }).uk}
																	</span>
																</div>
																<div className='flex items-center gap-2'>
																	<AdminEditCategory category={secondCat} />
																	<AdminDeleteCategory
																		category={secondCat}
																		products={products}
																	/>
																</div>
															</div>
														))}
												</div>
											</div>
										</div>
									)}
								</Fragment>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
