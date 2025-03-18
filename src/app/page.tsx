import { Hero } from '@/components/home/hero'
import { HomeCategories } from '@/components/home/categories'
import { HomeGallery } from '@/components/home/gallery'
import { categoriesService } from '@/services/categories.service'
import { slideService } from '@/services/slides.service'
import { galleryService } from '@/services/gallery.service'

export const revalidate = 180

export default async function Home() {
	const categories = (await categoriesService.getAllCategories())?.data
	const slides = (await slideService.getAllSlides())?.data
	const galleries = (await galleryService.getAll())?.data

	return (
		<section>
			<Hero slides={slides} />
			<HomeCategories categories={categories} />
			<HomeGallery galleries={galleries} />
		</section>
	)
}
