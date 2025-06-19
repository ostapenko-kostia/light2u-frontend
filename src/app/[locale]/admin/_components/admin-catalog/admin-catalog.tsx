import { useState } from 'react'
import { DetailsPanel } from './details-panel/details-panel'
import { FirstLevelCategory } from './first-level-category'
import { AdminCatalogProps, SelectedItemType } from './types'
import { AdminCreateFirstLevelCategory } from './admin-categories/admin-create-first-level-category'

export function AdminCatalogTab({
	products,
	firstLevelCategories,
	secondLevelCategories
}: AdminCatalogProps) {
	const [expandedFirstLevel, setExpandedFirstLevel] = useState<string[]>([])
	const [expandedSecondLevel, setExpandedSecondLevel] = useState<string[]>([])
	const [selectedItem, setSelectedItem] = useState<SelectedItemType>(null)

	// Toggle first level category expansion
	const toggleFirstLevel = (id: string) => {
		setExpandedFirstLevel(prev =>
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
		)
	}

	// Toggle second level category expansion
	const toggleSecondLevel = (id: string) => {
		setExpandedSecondLevel(prev =>
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
		)
	}

	// Handle item selection
	const handleSelect = (item: SelectedItemType) => {
		setSelectedItem(item)
	}

	return (
		<div className='p-4 max-sm:p-2 animate-opacity-1'>
			<h2 className='text-2xl font-semibold'>Каталог</h2>
			<div className='grid grid-cols-[1fr_2fr] gap-6 mt-6 max-lg:grid-cols-1'>
				<div className='bg-gray-100 w-full h-full p-2 overflow-auto'>
					<div className='space-y-1'>
						{firstLevelCategories.map(category => (
							<FirstLevelCategory
								key={category.id}
								category={category}
								secondLevelCategories={secondLevelCategories}
								products={products}
								selectedItem={selectedItem}
								isExpanded={expandedFirstLevel.includes(category.id)}
								onToggle={toggleFirstLevel}
								onSelect={handleSelect}
								expandedSecondLevel={expandedSecondLevel}
								toggleSecondLevel={toggleSecondLevel}
							/>
						))}
						<AdminCreateFirstLevelCategory />
					</div>
				</div>
				<DetailsPanel selectedItem={selectedItem} />
			</div>
		</div>
	)
}
