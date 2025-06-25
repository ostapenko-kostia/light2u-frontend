import { UaFlagIcon } from '@/components/icons/ua-flag-icon'
import { WhiteFlagIcon } from '@/components/icons/white-flag-icon'
import { ProductItem } from './product-item'
import { SecondLevelCategoryProps } from './types'

export function SecondLevelCategory({
	category,
	products,
	selectedItem,
	isExpanded,
	onToggle,
	onSelect
}: SecondLevelCategoryProps) {
	return (
		<div
			key={category.id}
			className='border-b border-gray-100'
		>
			<button
				className={`flex justify-between w-full px-3 py-2 text-left ${
					selectedItem === category ? 'bg-blue-100' : 'hover:bg-gray-200'
				}`}
				onClick={() => {
					onToggle(category.id)
					onSelect(category)
				}}
			>
				<span>{category.name.uk}</span>
				<span>{isExpanded ? '−' : '+'}</span>
			</button>

			{isExpanded && (
				<>
					{products
						.filter(product => product.categorySlug === category.slug)
						.filter(product => product.locale === 'uk').length > 0 && (
						<div className='pl-4 border-l border-gray-300 ml-3 mb-4'>
							<div className='flex items-center mb-2 mt-1'>
								<div className='flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded mr-2'>
									<UaFlagIcon
										width={16}
										height={12}
									/>
									<span className='ml-1'>UA</span>
								</div>
								<div className='h-px flex-grow bg-gray-200'></div>
							</div>
							{products
								.filter(product => product.categorySlug === category.slug)
								.filter(product => product.locale === 'uk')
								?.sort((a, b) => b.order - a.order)
								.map(product => (
									<ProductItem
										key={product.id}
										product={product}
										selectedItem={selectedItem}
										onSelect={onSelect}
									/>
								))}
						</div>
					)}
					{products
						.filter(product => product.categorySlug === category.slug)
						.filter(product => product.locale === 'ru').length > 0 && (
						<div className='pl-4 border-l border-gray-300 ml-3 mb-2'>
							<div className='flex items-center mb-2 mt-1'>
								<div className='flex items-center bg-red-500 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-2'>
									<WhiteFlagIcon
										width={16}
										height={12}
									/>
									<span className='ml-1 text-white'>RU</span>
								</div>
								<div className='h-px flex-grow bg-gray-200'></div>
							</div>
							{products
								.filter(product => product.categorySlug === category.slug)
								.filter(product => product.locale === 'ru')
								?.sort((a, b) => b.order - a.order)
								.map(product => (
									<ProductItem
										key={product.id}
										product={product}
										selectedItem={selectedItem}
										onSelect={onSelect}
									/>
								))}
						</div>
					)}
				</>
			)}
		</div>
	)
}
