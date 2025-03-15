import { Hero } from '@/components/home/hero'
import { HomeCategories } from '@/components/home/categories'
import { HomeGallery } from '@/components/home/gallery'

export default function Home() {
	return (
		<section>
			<Hero />
			<HomeCategories />
			<HomeGallery />
		</section>
	)
}
