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
				<div className='pl-4 border-l border-gray-300 ml-3'>
					{products
						.filter(product => product.categorySlug === category.slug)
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
		</div>
	)
}
