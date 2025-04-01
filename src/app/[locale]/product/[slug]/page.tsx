import { Container } from '@/components/layout/container'
import { ProductCard } from '@/components/layout/product-card'
import { getServerTranslation } from '@/lib/server-translation'
import { productsService } from '@/services/products.service'
import * as motion from 'framer-motion/client'
import { notFound } from 'next/navigation'
import { ProductImage } from './ProductImage'
import { Product } from './Product'

export default async function ProductPage({
	params
}: {
	params: Promise<{ slug: string; locale: string }>
}) {
	const { slug, locale } = await params
	const { t } = await getServerTranslation(locale)

	const products = (await productsService.getAllProducts())?.data

	const product = products?.find(p => {
		return p.slug === slug && (p.locale === locale || (!p.locale && locale === 'uk'))
	})

	const localeProducts = products?.filter(
		p => p.locale === locale || (!p.locale && locale === 'uk')
	)

	const sameProducts = localeProducts
		?.filter(p => p.categorySlug === product?.categorySlug)
		.filter(i => i.id !== product?.id)

	if (!product) notFound()

	return (
		<motion.section
			initial={{ translateY: '15px', opacity: 0 }}
			animate={{ translateY: '0px', opacity: 1 }}
			transition={{ duration: 0.7, ease: 'anticipate' }}
			className='py-12'
		>
			<Container className='grid grid-cols-[1.3fr_1fr] max-lg:grid-cols-2 max-md:grid-cols-1 gap-10'>
				<ProductImage product={product} />
				<div className='flex flex-col gap-4'>
					<Product product={product} />
				</div>
			</Container>
			{sameProducts && sameProducts.length > 0 && (
				<Container className='flex flex-col gap-4 mt-8'>
					<h2 className='text-2xl font-medium text-[#121212cc]'>{t('product-same-title')}</h2>
					<div className='grid grid-cols-4 gap-4 max-md:grid-cols-2 max-[500px]:!grid-cols-1'>
						{sameProducts?.map(product => (
							<ProductCard
								product={product}
								key={product.id}
							/>
						))}
					</div>
				</Container>
			)}
		</motion.section>
	)
}
