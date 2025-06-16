import { ICatalogData, ICatalogSearchParams } from '@/typing/interfaces'

export const filterProductsByLocale = (products: any[] | undefined, locale: string) => {
	return products?.filter(
		product => product.locale === locale || (!product.locale && locale === 'uk')
	)
}

export const filterProducts = (products: any[] | undefined, searchParams: ICatalogSearchParams) => {
	const { search, secondLevelCategory } = searchParams

	// If search is provided, search through all products
	if (search?.length) {
		return products?.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
	}

	// If category is selected and no search, filter by category
	if (secondLevelCategory) {
		return products?.filter(product => product.categorySlug === secondLevelCategory)
	}

	return products
}

export const getPageTitle = (
	searchParams: ICatalogSearchParams,
	catalogData: ICatalogData,
	locale: string,
	t: any
) => {
	const { search, firstLevelCategory, secondLevelCategory } = searchParams
	const { firstLevelCategories, secondLevelCategories } = catalogData

	if (secondLevelCategory) {
		const category = secondLevelCategories?.find(c => c.slug === secondLevelCategory)
		return (category?.name as any)?.[locale] || ''
	}

	if (firstLevelCategory) {
		const category = firstLevelCategories?.find(c => c.slug === firstLevelCategory)
		return (category?.name as any)?.[locale] || ''
	}

	return t('catalog-all-title')
}

export const getClearSearchUrl = (searchParams: ICatalogSearchParams) => {
	const { firstLevelCategory, secondLevelCategory } = searchParams

	if (secondLevelCategory) {
		return `/catalog?firstLevelCategory=${firstLevelCategory}&secondLevelCategory=${secondLevelCategory}`
	}

	if (firstLevelCategory) {
		return `/catalog?firstLevelCategory=${firstLevelCategory}`
	}

	return '/catalog'
}

export const buildCategoryHref = (
	categorySlug: string,
	searchParams: ICatalogSearchParams,
	isSecondLevel = false
) => {
	const { search, firstLevelCategory } = searchParams
	const searchQuery = search?.length ? `&search=${search}` : ''

	if (isSecondLevel) {
		return `/catalog?firstLevelCategory=${firstLevelCategory}&secondLevelCategory=${categorySlug}${searchQuery}`
	}

	return `/catalog?firstLevelCategory=${categorySlug}${searchQuery}`
}
