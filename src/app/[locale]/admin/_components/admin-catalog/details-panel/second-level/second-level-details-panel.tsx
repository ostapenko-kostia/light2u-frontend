import { useGetProducts } from '@/hooks/useProducts'
import { useTranslation } from '@/hooks/useTranslation'
import { ISecondLevelCategory } from '@/typing/interfaces'
import Image from 'next/image'
import { AdminDeleteCategory } from '../../admin-categories/admin-delete-category'
import { AdminEditCategory } from '../../admin-categories/admin-edit-categories'
import { AdminProductCreate } from '../../admin-products/admin-product-create'
import { AdminProductDuplicate } from '../../admin-products/admin-product-duplicate'
import { AdminProductMoveDown } from '../../admin-products/admin-product-move-down'
import { AdminProductMoveUp } from '../../admin-products/admin-product-move-up'

interface SecondLevelDetailsPanelProps {
	category: ISecondLevelCategory
}

export function SecondLevelDetailsPanel({ category }: SecondLevelDetailsPanelProps) {
	const { data: products } = useGetProducts()
	const { t, texts, locale } = useTranslation()

	// Filter products that belong to this category
	const categoryProducts = products?.filter(product => product.categorySlug === category.slug) || []

	return (
		<div className='p-4'>
			<div className='bg-white p-4 rounded shadow-sm'>
				<h3 className='text-lg font-medium mb-3'>Інформація про підкатегорію</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<div className='space-y-2'>
							<div>
								<div className='text-sm text-gray-500'>Назва (UK):</div>
								<div>{category.name.uk}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Назва (RU):</div>
								<div>{category.name.ru}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Slug:</div>
								<div>{category.slug}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Батьківська категорія:</div>
								<div>{category.parentCategorySlug}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Створено:</div>
								<div>{new Date(category.createdAt).toLocaleDateString()}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Оновлено:</div>
								<div>{new Date(category.updatedAt).toLocaleDateString()}</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-4'>
						<div>
							{category.image ? (
								<div className='bg-white p-2 rounded shadow-sm aspect-square relative max-w-[200px] mx-auto'>
									<Image
										src={category.image}
										alt={category.name.uk}
										fill
										sizes='200px'
										className='object-cover rounded'
									/>
								</div>
							) : (
								<div className='bg-gray-200 p-4 rounded text-center text-gray-600 aspect-square max-w-[200px] flex items-center justify-center mx-auto'>
									Немає зображення
								</div>
							)}
						</div>
						<div>
							<AdminEditCategory category={category} />
							<AdminDeleteCategory
								products={products}
								category={category}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-6'>
				<h3 className='text-lg font-medium mb-3'>
					Продукти в категорії ({categoryProducts.length})
				</h3>

				{categoryProducts.length === 0 ? (
					<div className='bg-gray-200 p-4 rounded text-center text-gray-600'>
						<p className='mb-6'>Немає продуктів у цій категорії</p>
						<AdminProductCreate
							category={category}
							locale={locale}
						/>
					</div>
				) : (
					<div className='space-y-2'>
						{categoryProducts
							?.sort((a, b) => b.order - a.order)
							.map(product => (
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
							))}
						<AdminProductCreate
							category={category}
							locale={locale}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
