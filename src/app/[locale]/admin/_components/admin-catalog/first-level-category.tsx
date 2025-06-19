import { SecondLevelCategory } from './second-level-category'
import { FirstLevelCategoryProps } from './types'

export function FirstLevelCategory({
	category,
	secondLevelCategories,
	products,
	selectedItem,
	isExpanded,
	onToggle,
	onSelect,
	expandedSecondLevel,
	toggleSecondLevel
}: FirstLevelCategoryProps) {
	return (
		<div
			key={category.id}
			className='border-b border-gray-200'
		>
			<button
				className={`flex justify-between w-full px-3 py-2 text-left font-medium ${
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
					{secondLevelCategories
						.filter(secondCategory => secondCategory.parentCategorySlug === category.slug)
						.map(secondCategory => (
							<SecondLevelCategory
								key={secondCategory.id}
								category={secondCategory}
								products={products}
								selectedItem={selectedItem}
								isExpanded={expandedSecondLevel.includes(secondCategory.id)}
								onToggle={toggleSecondLevel}
								onSelect={onSelect}
							/>
						))}
				</div>
			)}
		</div>
	)
}
