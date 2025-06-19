import { IFirstLevelCategory, IProduct, ISecondLevelCategory } from '@/typing/interfaces'
import { SelectedItemType } from '../types'
import { EmptyState } from './empty-state'
import { FirstLevelDetailsPanel } from './first-level/first-level-details-panel'
import { ProductDetailsPanel } from './product/product-details-panel'
import { SecondLevelDetailsPanel } from './second-level/second-level-details-panel'

interface DetailsPanelProps {
	selectedItem: SelectedItemType
}

export function DetailsPanel({ selectedItem }: DetailsPanelProps) {
	// Function to determine item type
	const getItemType = (): 'firstLevel' | 'secondLevel' | 'product' | null => {
		if (!selectedItem) return null

		// Check if it's a first level category
		if (
			'parentCategorySlug' in selectedItem === false &&
			'name' in selectedItem &&
			typeof selectedItem.name !== 'string'
		) {
			return 'firstLevel'
		}

		// Check if it's a second level category
		if ('parentCategorySlug' in selectedItem) {
			return 'secondLevel'
		}

		// Check if it's a product
		if ('categorySlug' in selectedItem) {
			return 'product'
		}

		return null
	}

	const itemType = getItemType()

	// Render the appropriate panel based on item type
	const renderPanel = () => {
		if (!selectedItem) return <EmptyState />

		switch (itemType) {
			case 'firstLevel':
				return <FirstLevelDetailsPanel category={selectedItem as IFirstLevelCategory} />
			case 'secondLevel':
				return <SecondLevelDetailsPanel category={selectedItem as ISecondLevelCategory} />
			case 'product':
				return <ProductDetailsPanel product={selectedItem as IProduct} />
			default:
				return <EmptyState />
		}
	}

	return <div className='bg-gray-100 w-full h-full overflow-auto'>{renderPanel()}</div>
}
