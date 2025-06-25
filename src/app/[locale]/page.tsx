import { HomeCategories } from '@/components/home/categories'
import { Hero } from '@/components/home/hero'
import { categoriesService } from '@/services/categories.service'
import { slideService } from '@/services/slides.service'

export const revalidate = 180

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const locale = (await params).locale
	const firstLevelCategories = await categoriesService.getAllFirstLevelCategories()
	const slides = await slideService.getAllSlides()

	const localizedSlides = slides?.filter(
		slide => slide.locale === locale || (!slide.locale && locale === 'uk')
	)

	return (
		<section>
			<Hero slides={localizedSlides} />
			<HomeCategories
				categories={firstLevelCategories}
				locale={locale}
			/>
		</section>
	)
}
