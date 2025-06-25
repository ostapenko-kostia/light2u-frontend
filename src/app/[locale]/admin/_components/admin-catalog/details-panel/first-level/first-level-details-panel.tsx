import { useGetSecondLevelCategories } from '@/hooks/useCategories'
import { IFirstLevelCategory } from '@/typing/interfaces'
import Image from 'next/image'
import { AdminEditCategory } from '../../admin-categories/admin-edit-categories'
import { AdminDeleteCategory } from '../../admin-categories/admin-delete-category'
import { useGetProducts } from '@/hooks/useProducts'
import { AdminCreateSecondLevelCategory } from '../../admin-categories/admin-create-second-level-category'

interface FirstLevelDetailsPanelProps {
	category: IFirstLevelCategory
}

export function FirstLevelDetailsPanel({ category }: FirstLevelDetailsPanelProps) {
	const { data: secondLevelCategories } = useGetSecondLevelCategories()
	const { data: products } = useGetProducts()

	// Filter second level categories that belong to this first level category
	const childCategories =
		secondLevelCategories?.filter(
			secondCategory => secondCategory.parentCategorySlug === category.slug
		) || []

	return (
		<div className='p-4'>
			<div className='bg-white p-4 rounded shadow-sm'>
				<h3 className='text-lg font-medium mb-3'>Інформація про категорію</h3>
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
								secondLevelCategories={secondLevelCategories}
								category={category}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-6'>
				<h3 className='text-lg font-medium mb-3'>Дочірні категорії ({childCategories.length})</h3>

				{childCategories.length === 0 ? (
					<div className='bg-gray-200 p-4 rounded text-center text-gray-600'>
						Немає дочірніх категорій
						<AdminCreateSecondLevelCategory parentCategorySlug={category.slug} />
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{childCategories.map(childCategory => (
							<div
								key={childCategory.id}
								className='bg-white p-3 rounded shadow-sm flex items-center gap-3 hover:bg-gray-50'
							>
								{childCategory.image && (
									<div className='w-14 h-14 relative'>
										<Image
											src={childCategory.image}
											alt={childCategory.name.uk}
											fill
											sizes='56px'
											className='object-cover rounded'
										/>
									</div>
								)}
								<div>
									<div className='font-medium'>{childCategory.name.uk}</div>
									<div className='text-xs text-gray-500'>Slug: {childCategory.slug}</div>
								</div>
							</div>
						))}
						<AdminCreateSecondLevelCategory parentCategorySlug={category.slug} />
					</div>
				)}
			</div>
		</div>
	)
}
