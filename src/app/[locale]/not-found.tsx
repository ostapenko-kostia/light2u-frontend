'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
	const { t } = useTranslation()

	return (
		<motion.div
			initial={{ translateY: '15px', opacity: 0 }}
			animate={{ translateY: '0px', opacity: 1 }}
			transition={{ duration: 0.7, ease: 'anticipate' }}
			className='relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
		>
			<h1 className='text-center text-4xl font-bold'>404</h1>
			<p className='text-center'>{t('not-found-text')}</p>
		</motion.div>
	)
}
