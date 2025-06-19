import { IFirstLevelCategory, IProduct, ISecondLevelCategory } from '@/typing/interfaces'

export type SelectedItemType = IFirstLevelCategory | ISecondLevelCategory | IProduct | null

export interface AdminCatalogProps {
	products: IProduct[]
	firstLevelCategories: IFirstLevelCategory[]
	secondLevelCategories: ISecondLevelCategory[]
}

export interface FirstLevelCategoryProps {
	category: IFirstLevelCategory
	secondLevelCategories: ISecondLevelCategory[]
	products: IProduct[]
	selectedItem: SelectedItemType
	isExpanded: boolean
	onToggle: (id: string) => void
	onSelect: (item: SelectedItemType) => void
	expandedSecondLevel: string[]
	toggleSecondLevel: (id: string) => void
}

export interface SecondLevelCategoryProps {
	category: ISecondLevelCategory
	products: IProduct[]
	selectedItem: SelectedItemType
	isExpanded: boolean
	onToggle: (id: string) => void
	onSelect: (item: SelectedItemType) => void
}

export interface ProductItemProps {
	product: IProduct
	selectedItem: SelectedItemType
	onSelect: (item: SelectedItemType) => void
}

export interface DetailsPanelProps {
	selectedItem: SelectedItemType
}
