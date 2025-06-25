import * as motion from 'framer-motion/client'
import { Container } from '@/components/layout/container'
import Link from 'next/link'

export function AboutCta({ t }: { t: (key: string) => string }) {
	return (
		<section className='py-20 bg-gradient-to-r from-amber-600 to-amber-400 text-white'>
			<Container>
				<div className='flex flex-wrap items-center'>
					<div className='w-full lg:w-2/3 px-4'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7 }}
						>
							<h2 className='text-3xl md:text-4xl font-bold mb-4'>
								{t('about-cta-title') || 'Ready to Transform Your Space?'}
							</h2>
							<p className='text-lg md:text-xl mb-0 md:mb-0'>{t('about-cta-desc')}</p>
						</motion.div>
					</div>
					<div className='w-full lg:w-1/3 px-4 mt-6 lg:mt-0 text-center md:text-right'>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7, delay: 0.3 }}
						>
							<Link
								href='/catalog'
								className='inline-block px-8 py-4 bg-white text-amber-600 font-bold rounded-md hover:bg-gray-100 transition-colors text-lg'
							>
								{t('about-cta-button') || 'Explore Our Catalog'}
							</Link>
						</motion.div>
					</div>
				</div>
			</Container>
		</section>
	)
}
