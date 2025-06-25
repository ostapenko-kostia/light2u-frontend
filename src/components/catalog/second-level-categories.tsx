import { CategoryCard } from '@/components/layout/category-card'
import { ICatalogSearchParams } from '@/typing/interfaces'
import { buildCategoryHref } from '@/utils/catalog.utils'
import { AnimatedSection } from './animated-section'

interface SecondLevelCategoriesProps {
	categories: any[] | undefined
	locale: string
	searchParams: ICatalogSearchParams
}

export const SecondLevelCategories = ({
	categories,
	locale,
	searchParams
}: SecondLevelCategoriesProps) => {
	const { firstLevelCategory } = searchParams
	const filteredCategories = categories?.filter(
		cat => cat.parentCategorySlug === firstLevelCategory
	)

	return (
		<AnimatedSection>
			{filteredCategories?.map(category => (
				<CategoryCard
					key={category.id}
					category={category}
					locale={locale}
					href={buildCategoryHref(category.slug, searchParams, true)}
				/>
			))}
		</AnimatedSection>
	)
}
