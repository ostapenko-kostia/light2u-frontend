import { CategoryCard } from '@/components/layout/category-card'
import { ICatalogSearchParams } from '@/typing/interfaces'
import { buildCategoryHref } from '@/utils/catalog.utils'
import { AnimatedSection } from './animated-section'

interface FirstLevelCategoriesProps {
	categories: any[] | undefined
	locale: string
	searchParams: ICatalogSearchParams
}

export const FirstLevelCategories = ({
	categories,
	locale,
	searchParams
}: FirstLevelCategoriesProps) => (
	<AnimatedSection>
		{categories?.map(category => (
			<CategoryCard
				key={category.id}
				category={category}
				locale={locale}
				href={buildCategoryHref(category.slug, searchParams)}
			/>
		))}
	</AnimatedSection>
)
