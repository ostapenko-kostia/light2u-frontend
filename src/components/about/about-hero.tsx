import * as motion from 'framer-motion/client'
import Image from 'next/image'

export function AboutHero({ t }: { t: (key: string) => string }) {
	return (
		<div className='relative w-full h-[60vh] flex items-center justify-center'>
			<div className='absolute inset-0 z-0'>
				<Image
					src='/placeholder.svg'
					alt='Light2U Modern Lighting Solutions'
					fill
					priority
					className='object-cover brightness-[0.7]'
				/>
			</div>
			<motion.div
				className='z-10 text-center text-white px-4'
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
			>
				<h1 className='text-5xl md:text-6xl font-bold mb-6'>{t('about-title')}</h1>
				<p className='text-xl max-w-2xl mx-auto'>{t('about-description')}</p>
			</motion.div>
		</div>
	)
}
