import * as motion from 'framer-motion/client'
import Image from 'next/image'
import { Container } from '../layout/container'

export function ContactsMap({ t }: { t: (key: string) => string }) {
	return (
		<motion.div
			className='h-full min-h-[400px]'
			initial={{ opacity: 0, x: 30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.7, delay: 0.2 }}
		>
			<h2 className='text-2xl font-bold mb-6 border-b-2 border-amber-400 inline-block pb-2'>
				{t('contacts-map-title')}
			</h2>

			<div className='h-[400px] relative rounded-lg overflow-hidden'>
				<Image
					src='/placeholder.svg'
					alt='Map location'
					fill
					className='object-cover'
				/>
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='bg-white bg-opacity-90 px-4 py-3 rounded-lg shadow-lg'>
						<p className='font-medium'>{t('contacts-map-address')}</p>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
