import { Container } from '@/components/layout/container'
import { ProductCard } from '@/components/layout/product-card'
import { getServerTranslation } from '@/lib/server-translation'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import * as motion from 'framer-motion/client'
import Link from 'next/link'

export default async function CatalogPage({
	searchParams,
	params
}: {
	searchParams: Promise<{ category: string }>
	params: Promise<{ locale: string }>
}) {
	const { category } = await searchParams
	const { locale } = await params

	const { t } = await getServerTranslation(locale)

	const products = (await productsService.getAllProducts())?.data

	// Filter products by locale first, then by category if selected
	const localeProducts = products?.filter(
		product => product.locale === locale || (!product.locale && locale === 'uk')
	)
	const filteredProducts = category?.length
		? localeProducts?.filter(i => i.categorySlug === category)
		: localeProducts

	const categories = (await categoriesService.getAllCategories())?.data

	const categoryName = category
		? (categories?.find(c => c.slug === category)?.name as any)[locale]
		: null

	return (
		<section className='py-12'>
			<Container>
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='text-4xl uppercase tracking-wide'
				>
					{category ? categoryName : t('catalog-all-title')}
				</motion.h1>
				<motion.ul
					initial={{ translateY: '15px', opacity: 0 }}
					animate={{ translateY: '0px', opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='flex items-center gap-x-12 gap-y-6 mt-6 uppercase text-sm tracking-wide max-sm:text-center max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-6 max-sm:gap-y-4 max-[400px]:!grid-cols-1'
				>
					<li className='hover:underline underline-offset-4'>
						<Link href='/catalog'>{t('catalog-all-categories')}</Link>
					</li>
					{categories?.map(category => (
						<li
							className='hover:underline underline-offset-4'
							key={category.id}
						>
							<Link href={`/catalog?category=${category.slug}`}>
								{(category.name as any)[locale]}
							</Link>
						</li>
					))}
				</motion.ul>
				<motion.section
					initial={{ translateY: '15px', opacity: 0 }}
					animate={{ translateY: '0px', opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[400px]:!grid-cols-1 gap-6 w-full mt-12'
				>
					{filteredProducts?.map(product => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
				</motion.section>
			</Container>
		</section>
	)
}
