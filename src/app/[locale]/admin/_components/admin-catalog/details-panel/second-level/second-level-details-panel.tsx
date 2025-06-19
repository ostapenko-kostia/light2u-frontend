import { useGetProducts } from '@/hooks/useProducts'
import { ISecondLevelCategory } from '@/typing/interfaces'
import Image from 'next/image'
import { AdminDeleteCategory } from '../../admin-categories/admin-delete-category'
import { AdminEditCategory } from '../../admin-categories/admin-edit-categories'
import { AdminProductCreate } from '../../admin-products/admin-product-create'
import { ProductCard } from './product-card'
import { UaFlagIcon } from '@/components/icons/ua-flag-icon'
import { WhiteFlagIcon } from '@/components/icons/white-flag-icon'

interface SecondLevelDetailsPanelProps {
	category: ISecondLevelCategory
}

export function SecondLevelDetailsPanel({ category }: SecondLevelDetailsPanelProps) {
	const { data: products } = useGetProducts()

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
								<div className='text-sm text-gray-500'>Назва (UA):</div>
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

				<div className='space-y-2 mb-4'>
					<div className='mb-2 flex items-center gap-2'>
						<UaFlagIcon
							width={20}
							height={15}
						/>
						Українська мова
					</div>
					{categoryProducts.length > 0 ? (
						categoryProducts
							?.filter(item => item.locale === 'uk')
							?.sort((a, b) => b.order - a.order)
							.map(product => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))
					) : (
						<p className='mb-6'>Немає продуктів у цій категорії</p>
					)}
					<AdminProductCreate
						category={category}
						locale='uk'
					/>
				</div>

				<div className='space-y-2 mb-4'>
					<div className='mb-2 flex items-center gap-2'>
						<WhiteFlagIcon
							width={20}
							height={15}
						/>
						Російська мова
					</div>
					{categoryProducts.length > 0 ? (
						categoryProducts
							?.filter(item => item.locale === 'ru')
							?.sort((a, b) => b.order - a.order)
							.map(product => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))
					) : (
						<p className='mb-6'>Немає продуктів у цій категорії</p>
					)}
					<AdminProductCreate
						category={category}
						locale='ru'
					/>
				</div>
			</div>
		</div>
	)
}
