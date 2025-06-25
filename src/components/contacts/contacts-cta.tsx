import { Container } from '@/components/layout/container'
import * as motion from 'framer-motion/client'
import Link from 'next/link'

export function ContactsCta({ t }: { t: (key: string) => string }) {
	return (
		<section className='py-16 bg-amber-600 text-white'>
			<Container>
				<motion.div
					className='text-center max-w-3xl mx-auto'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
				>
					<h2 className='text-3xl font-bold mb-6'>{t('contacts-cta-title')}</h2>
					<p className='mb-8 text-lg'>{t('contacts-cta-desc')}</p>
					<div className='flex flex-wrap justify-center gap-4'>
						<Link
							href='/catalog'
							className='px-8 py-3 bg-white text-amber-600 font-bold rounded-md hover:bg-gray-100 transition-colors'
						>
							{t('contacts-cta-catalog')}
						</Link>
						<Link
							href={`tel:${t('contacts-phone-number')}`}
							className='px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-amber-600 transition-colors'
						>
							{t('contacts-cta-call')}
						</Link>
					</div>
				</motion.div>
			</Container>
		</section>
	)
}
