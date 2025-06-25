import * as motion from 'framer-motion/client'
import Link from 'next/link'
import { Container } from '../layout/container'

export function ContactsInfo({ t }: { t: (key: string) => string }) {
	return (
		<Container className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
			{/* Phone */}
			<motion.div
				className='bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.1 }}
			>
				<div className='w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='text-white'
					>
						<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'></path>
					</svg>
				</div>
				<h3 className='text-xl font-semibold mb-2'>{t('contacts-phone-title')}</h3>
				<p className='text-gray-600 mb-2'>{t('contacts-phone-desc')}</p>
				<Link
					href={`tel:${t('contacts-phone-number')}`}
					className='text-amber-600 font-medium'
				>
					{t('contacts-phone-number')}
				</Link>
			</motion.div>

			{/* Email */}
			<motion.div
				className='bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				<div className='w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='text-white'
					>
						<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
						<polyline points='22,6 12,13 2,6'></polyline>
					</svg>
				</div>
				<h3 className='text-xl font-semibold mb-2'>{t('contacts-email-title')}</h3>
				<p className='text-gray-600 mb-2'>{t('contacts-email-desc')}</p>
				<Link
					href={`mailto:${t('contacts-email-address')}`}
					className='text-amber-600 font-medium'
				>
					{t('contacts-email-address')}
				</Link>
			</motion.div>

			{/* Visit */}
			<motion.div
				className='bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
			>
				<div className='w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='text-white'
					>
						<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
						<circle
							cx='12'
							cy='10'
							r='3'
						></circle>
					</svg>
				</div>
				<h3 className='text-xl font-semibold mb-2'>{t('contacts-visit-title')}</h3>
				<p className='text-gray-600 mb-2'>{t('contacts-visit-desc')}</p>
				<address className='not-italic text-amber-600 font-medium'>{t('contacts-address')}</address>
			</motion.div>
		</Container>
	)
}
