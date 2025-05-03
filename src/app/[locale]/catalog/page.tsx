import { CategoryCard } from '@/components/layout/category-card'
import { Container } from '@/components/layout/container'
import { ProductCard } from '@/components/layout/product-card'
import { getServerTranslation } from '@/lib/server-translation'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import * as motion from 'framer-motion/client'
import { X } from 'lucide-react'
import Link from 'next/link'

export default async function CatalogPage({
	searchParams,
	params
}: {
	searchParams: Promise<{ search: string; firstLevelCategory: string; secondLevelCategory: string }>
	params: Promise<{ locale: string }>
}) {
	const { firstLevelCategory, secondLevelCategory, search } = await searchParams
	const { locale } = await params
	const { t } = await getServerTranslation(locale)

	const firstLevelCategories = await categoriesService.getAllFirstLevelCategories()
	const secondLevelCategories = await categoriesService.getAllSecondLevelCategories()
	const products = (await productsService.getAllProducts())?.data

	// Filter products by locale first
	const localeProducts = products?.filter(
		product => product.locale === locale || (!product.locale && locale === 'uk')
	)

	// Filter products by category if selected
	let filteredProducts = localeProducts
	if (secondLevelCategory) {
		filteredProducts = localeProducts?.filter(i => i.categorySlug === secondLevelCategory)
	}

	// Filter by search if provided
	if (search?.length) {
		filteredProducts = filteredProducts?.filter(i =>
			i.name.toLowerCase().includes(search.toLowerCase())
		)
	}

	return (
		<section className='py-12'>
			<Container>
				<div className='flex items-center gap-4'>
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.7, ease: 'anticipate' }}
						className='text-4xl uppercase tracking-wide'
					>
						{secondLevelCategory
							? (secondLevelCategories?.find(c => c.slug === secondLevelCategory)?.name as any)[
									locale
							  ]
							: firstLevelCategory
							? (firstLevelCategories?.find(c => c.slug === firstLevelCategory)?.name as any)[
									locale
							  ]
							: t('catalog-all-title')}{' '}
						{search?.length && `- "${search}"`}
					</motion.h1>
					{search?.length && (
						<Link
							href={
								secondLevelCategory
									? `/catalog?firstLevelCategory=${firstLevelCategory}&secondLevelCategory=${secondLevelCategory}`
									: firstLevelCategory
									? `/catalog?firstLevelCategory=${firstLevelCategory}`
									: '/catalog'
							}
							className='text-sm text-gray-500'
						>
							<X color='#121212' />
						</Link>
					)}
				</div>

				{/* First Level Categories */}
				{!firstLevelCategory && (
					<motion.section
						initial={{ translateY: '15px', opacity: 0 }}
						animate={{ translateY: '0px', opacity: 1 }}
						transition={{ duration: 0.7, ease: 'anticipate' }}
						className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[400px]:!grid-cols-1 gap-6 w-full mt-12'
					>
						{firstLevelCategories?.map(category => (
							<CategoryCard
								key={category.id}
								category={category}
								locale={locale}
								href={
									search?.length
										? `/catalog?firstLevelCategory=${category.slug}&search=${search}`
										: `/catalog?firstLevelCategory=${category.slug}`
								}
							/>
						))}
					</motion.section>
				)}

				{/* Second Level Categories */}
				{firstLevelCategory && !secondLevelCategory && (
					<motion.section
						initial={{ translateY: '15px', opacity: 0 }}
						animate={{ translateY: '0px', opacity: 1 }}
						transition={{ duration: 0.7, ease: 'anticipate' }}
						className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[400px]:!grid-cols-1 gap-6 w-full mt-12'
					>
						{secondLevelCategories
							?.filter(cat => cat.parentCategorySlug === firstLevelCategory)
							.map(category => (
								<CategoryCard
									key={category.id}
									category={category}
									locale={locale}
									href={
										search?.length
											? `/catalog?firstLevelCategory=${firstLevelCategory}&secondLevelCategory=${category.slug}&search=${search}`
											: `/catalog?firstLevelCategory=${firstLevelCategory}&secondLevelCategory=${category.slug}`
									}
								/>
							))}
					</motion.section>
				)}

				{/* Products */}
				{secondLevelCategory && (
					<motion.section
						initial={{ translateY: '15px', opacity: 0 }}
						animate={{ translateY: '0px', opacity: 1 }}
						transition={{ duration: 0.7, ease: 'anticipate' }}
						className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[400px]:!grid-cols-1 gap-6 w-full mt-12'
					>
						{filteredProducts?.length ? (
							filteredProducts
								.sort((a, b) => b.order - a.order)
								.map(product => (
									<ProductCard
										key={product.id}
										product={product}
									/>
								))
						) : (
							<p className='text-gray-500'>{t('catalog-no-products')}</p>
						)}
					</motion.section>
				)}
			</Container>
		</section>
	)
}
