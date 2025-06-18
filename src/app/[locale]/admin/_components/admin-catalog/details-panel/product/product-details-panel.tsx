import { useGetSecondLevelCategories } from '@/hooks/useCategories'
import { LOCALE } from '@/typing/enums'
import { IProduct } from '@/typing/interfaces'
import Image from 'next/image'
import { AdminProductDelete } from '../../admin-products/admin-product-delete'
import { AdminProductEdit } from '../../admin-products/admin-product-edit'

interface ProductDetailsPanelProps {
	product: IProduct
}

export function ProductDetailsPanel({ product }: ProductDetailsPanelProps) {
	const { data: categories } = useGetSecondLevelCategories()

	return (
		<div className='p-4'>
			<div className='bg-white p-4 rounded shadow-sm mb-6'>
				<h3 className='text-lg font-medium mb-3'>Управління продуктом</h3>
				<div className='flex flex-wrap gap-2'>
					<AdminProductEdit
						categories={categories}
						product={product}
					/>
					<AdminProductDelete
						productId={product.id}
						productName={product.name}
					/>
				</div>
			</div>

			<div className='bg-white p-4 rounded shadow-sm'>
				<h3 className='text-lg font-medium mb-3'>Інформація про продукт</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<h4 className='font-medium mb-2'>Основна інформація</h4>
						<div className='space-y-2'>
							<div>
								<div className='text-sm text-gray-500'>Назва:</div>
								<div>{product.name}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Ціна:</div>
								<div className='font-bold'>{product.price} ₴</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Кількість:</div>
								<div>{product.quantity} шт</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Slug:</div>
								<div>{product.slug}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Мова:</div>
								<div>{product.locale === LOCALE.UA ? 'Українська' : 'Русский'}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Категорія:</div>
								<div>{product.categorySlug}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Порядок:</div>
								<div>{product.order}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Створено:</div>
								<div>{new Date(product.createdAt).toLocaleDateString()}</div>
							</div>
							<div>
								<div className='text-sm text-gray-500'>Оновлено:</div>
								<div>{new Date(product.updatedAt).toLocaleDateString()}</div>
							</div>
						</div>
					</div>
					<div>
						<h4 className='font-medium mb-2'>Додаткові характеристики</h4>
						{product.info && product.info.length > 0 ? (
							<div className='space-y-1'>
								{product.info.map(info => (
									<div
										key={info.id}
										className='grid grid-cols-2'
									>
										<div className='text-sm text-gray-600'>{info.key}:</div>
										<div>{info.value}</div>
									</div>
								))}
							</div>
						) : (
							<div className='text-sm text-gray-500'>Немає додаткових характеристик</div>
						)}
					</div>
				</div>

				<div className='mt-4'>
					<h4 className='font-medium mb-2'>Опис</h4>
					<div className='bg-gray-50 p-3 rounded'>
						{product.description || <span className='text-gray-500'>Немає опису</span>}
					</div>
				</div>
			</div>

			<div className='mt-6'>
				<h3 className='text-lg font-medium mb-3'>Зображення ({product.images?.length || 0})</h3>

				{!product.images || product.images.length === 0 ? (
					<div className='bg-gray-200 p-4 rounded text-center text-gray-600'>Немає зображень</div>
				) : (
					<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
						{product.images.map((image, index) => (
							<div
								key={index}
								className='bg-white p-2 rounded shadow-sm aspect-square relative'
							>
								<Image
									src={image}
									alt={`${product.name} - зображення ${index + 1}`}
									fill
									sizes='(max-width: 768px) 50vw, 25vw'
									className='object-cover rounded'
								/>
								<div className='absolute top-0 right-0 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded-bl'>
									{index === 0 ? 'Головне' : `#${index + 1}`}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
