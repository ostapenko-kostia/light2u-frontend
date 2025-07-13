import { Container } from '@/components/layout/container'
import { ProductCard } from '@/components/layout/product-card'
import { getServerTranslation } from '@/lib/server-translation'
import { productsService } from '@/services/products.service'
import * as motion from 'framer-motion/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Product } from './Product'
import { ProductImage } from './ProductImage'

export default async function ProductPage({
	params
}: {
	params: Promise<{ slug: string; locale: string }>
}) {
	const { slug, locale } = await params
	const { t } = await getServerTranslation(locale)

	const products = await productsService.getAllProducts()

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
			transition={{ duration: 1, ease: 'anticipate' }}
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

			<Container className='mt-20 mb-10'>
				<Link href='/contacts'>
					<div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-8 items-center'>
						<div className='flex-shrink-0 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-10 w-10 text-gray-700'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
								/>
							</svg>
						</div>
						<div className='flex-grow'>
							<h3 className='text-2xl font-medium mb-2 text-gray-800'>
								{t('product-cta-title') || 'Have questions about this product?'}
							</h3>
							<p className='text-gray-600 mb-4 max-w-2xl'>
								{t('product-cta-text') ||
									'Our lighting specialists can help you choose the perfect solution for your space. Contact us today for personalized assistance with your purchase.'}
							</p>
							<button className='px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors duration-200 inline-flex items-center gap-2'>
								{t('product-cta-button') || 'Contact us'}
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M14 5l7 7m0 0l-7 7m7-7H3'
									/>
								</svg>
							</button>
						</div>
					</div>
				</Link>
			</Container>
		</motion.section>
	)
}
