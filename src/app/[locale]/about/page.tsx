import { Container } from '@/components/layout/container'
import Image from 'next/image'
import * as motion from 'framer-motion/client'
import { getServerTranslation } from '@/lib/server-translation'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const { t } = await getServerTranslation(locale)

	return (
		<section className='py-6'>
			<motion.h2
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.7, ease: 'anticipate' }}
				className='text-center text-2xl font-bold mb-10'
			>
				{t('about-title')}
			</motion.h2>
			<Container className='grid grid-cols-[1fr_2fr] max-lg:grid-cols-2 max-md:grid-cols-1 gap-10'>
				<motion.div
					initial={{ translateY: '15px', opacity: 0 }}
					animate={{ translateY: '0px', opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='relative w-full h-full'
				>
					<Image
						src='/test5.webp'
						alt='About'
						width={1000}
						height={1000}
						priority
						className='object-cover w-full h-full aspect-square max-md:hidden'
					/>
				</motion.div>
				<motion.div
					initial={{ translateY: '15px', opacity: 0 }}
					animate={{ translateY: '0px', opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='text-center w-full'
				>
					<p>{t('about-description')}</p>
				</motion.div>
			</Container>
		</section>
	)
}
