import {
	FirstLevelCategories,
	PageHeader,
	ProductsList,
	SecondLevelCategories
} from '@/components/catalog'
import { Container } from '@/components/layout/container'
import { getServerTranslation } from '@/lib/server-translation'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import {
	filterProducts,
	filterProductsByLocale,
	getClearSearchUrl,
	getPageTitle
} from '@/utils/catalog.utils'

export default async function CatalogPage({
	searchParams,
	params
}: {
	searchParams: Promise<{ search: string; firstLevelCategory: string; secondLevelCategory: string }>
	params: Promise<{ locale: string }>
}) {
	const searchParamsData = await searchParams
	const { locale } = await params
	const { t } = await getServerTranslation(locale)

	// Fetch data in parallel
	const [firstLevelCategories, secondLevelCategories, products] = await Promise.all([
		categoriesService.getAllFirstLevelCategories(),
		categoriesService.getAllSecondLevelCategories(),
		productsService.getAllProducts()
	])

	const catalogData = { firstLevelCategories, secondLevelCategories, products }

	// Filter products
	const localeProducts = filterProductsByLocale(products, locale)
	const filteredProducts = filterProducts(localeProducts, searchParamsData)

	// Get derived data
	const pageTitle = getPageTitle(searchParamsData, catalogData, locale, t)
	const clearSearchUrl = getClearSearchUrl(searchParamsData)

	// Determine what to show
	const { search, firstLevelCategory, secondLevelCategory } = searchParamsData
	const showFirstLevelCategories = !firstLevelCategory && !secondLevelCategory && !search?.length
	const showSecondLevelCategories = firstLevelCategory && !secondLevelCategory && !search?.length
	const showProducts = secondLevelCategory || search?.length

	return (
		<section className='py-12 animation-opacity'>
			<Container>
				<PageHeader
					title={pageTitle}
					search={search}
					clearSearchUrl={clearSearchUrl}
				/>

				{showFirstLevelCategories && (
					<FirstLevelCategories
						categories={firstLevelCategories}
						locale={locale}
						searchParams={searchParamsData}
					/>
				)}

				{showSecondLevelCategories && (
					<SecondLevelCategories
						categories={secondLevelCategories}
						locale={locale}
						searchParams={searchParamsData}
					/>
				)}

				{showProducts && (
					<ProductsList
						products={filteredProducts}
						t={t}
					/>
				)}
			</Container>
		</section>
	)
}
