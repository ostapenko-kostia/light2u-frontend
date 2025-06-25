import * as motion from 'framer-motion/client'
import Image from 'next/image'

export function ContactsHero({ t }: { t: (key: string) => string }) {
	return (
		<div className='relative w-full h-[40vh] flex items-center justify-center'>
			<div className='absolute inset-0 z-0'>
				<Image
					src="/placeholder.svg" 
					alt='Contact Us'
					fill
					priority
					className='object-cover brightness-[0.6]'
				/>
			</div>
			<motion.div
				className='z-10 text-center text-white px-4'
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
			>
				<h1 className='text-4xl md:text-5xl font-bold mb-4'>{t('contacts-title')}</h1>
				<p className='text-lg max-w-2xl mx-auto'>{t('contacts-subtitle')}</p>
			</motion.div>
		</div>
	)
}
