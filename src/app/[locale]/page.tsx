import { HomeCategories } from '@/components/home/categories'
import { HomeGallery } from '@/components/home/gallery'
import { Hero } from '@/components/home/hero'
import { categoriesService } from '@/services/categories.service'
import { galleryService } from '@/services/gallery.service'
import { slideService } from '@/services/slides.service'

export const revalidate = 180

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const locale = (await params).locale
	const categories = (await categoriesService.getAllCategories())?.data
	const slides = (await slideService.getAllSlides())?.data
	const galleries = (await galleryService.getAll())?.data

	// Фільтрація слайдів за поточною локаллю
	const localizedSlides = slides?.filter(
		slide => slide.locale === locale || (!slide.locale && locale === 'uk')
	)

	return (
		<section>
			<Hero slides={localizedSlides} />
			<HomeCategories
				categories={categories}
				locale={locale}
			/>
			<HomeGallery galleries={galleries} />
		</section>
	)
}
