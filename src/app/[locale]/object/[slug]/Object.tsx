'use client'

import { ContactsCta } from '@/components/contacts/contacts-cta'
import { Container } from '@/components/layout/container'
import { useTranslation } from '@/hooks/useTranslation'
import { IObject } from '@/typing/interfaces'
import * as motion from 'framer-motion/client'
import { Mail, MapPin, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ObjectProps {
	object: IObject
}

export function Object({ object }: ObjectProps) {
	const { t } = useTranslation()
	const [selectedImage, setSelectedImage] = useState(0)
	const [isLightboxOpen, setIsLightboxOpen] = useState(false)

	return (
		<>
			{/* Hero Section with Gallery */}
			<section className='relative bg-gray-50 overflow-hidden'>
				<Container className='py-12'>
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						{/* Gallery */}
						<motion.div
							className='space-y-4'
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7 }}
						>
							{/* Main Image */}
							<div className='aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 relative'>
								{object.images && object.images.length > 0 ? (
									<>
										<Image
											src={object.images[selectedImage]}
											alt={object.name}
											onClick={() => setIsLightboxOpen(true)}
											width={700}
											height={550}
											className='w-full h-full object-contain rounded-2xl cursor-zoom-in'
										/>
										<button
											onClick={() => setIsLightboxOpen(true)}
											className='absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors duration-300 shadow-lg'
											aria-label={t('object-open-gallery')}
										>
											<Maximize2 className='w-5 h-5' />
										</button>
									</>
								) : (
									<div className='w-full h-full flex items-center justify-center text-gray-400'>
										{t('object-no-image')}
									</div>
								)}
							</div>

							{/* Thumbnail Gallery */}
							{object.images && object.images.length > 1 && (
								<div className='grid grid-cols-4 gap-3'>
									{object.images.map((image, index) => (
										<button
											key={index}
											onClick={() => setSelectedImage(index)}
											className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
												selectedImage === index
													? 'border-amber-500 scale-105'
													: 'border-gray-200 hover:border-gray-300'
											}`}
										>
											<img
												src={image}
												alt={`${object.name} - ${index + 1}`}
												className='w-full h-full object-cover'
											/>
										</button>
									))}
								</div>
							)}
						</motion.div>

						{/* Content */}
						<motion.div
							className='space-y-6'
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
						>
							{/* Title */}
							<h1 className='text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
								{object.name}
							</h1>

							{/* Location Info */}
							<div className='space-y-3'>
								<div className='flex items-center gap-3 text-gray-600'>
									<MapPin className='w-5 h-5 text-amber-500' />
									<span className='text-lg font-medium'>{object.city}</span>
								</div>
								<div className='flex items-start gap-3 text-gray-600'>
									<MapPin className='w-5 h-5 text-amber-500 mt-0.5' />
									<span className='text-lg'>{object.address}</span>
								</div>
							</div>

							{/* Contact Buttons */}
							<div className='flex flex-wrap gap-4 pt-4'>
								<Link
									href={'/contacts#form'}
									className='flex items-center gap-2 px-6 py-3 border-2 border-amber-500 text-amber-500 font-semibold rounded-lg hover:bg-amber-50 transition-colors'
								>
									<Mail className='w-4 h-4' />
									{t('contacts-email-title')}
								</Link>
							</div>
						</motion.div>
					</div>
				</Container>
			</section>

			{/* Description Section */}
			<section className='py-16 bg-white overflow-hidden'>
				<Container>
					<motion.div
						className='max-w-4xl mx-auto'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7 }}
					>
						<h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
							{t('object-description-title')}
						</h2>
						<div className='prose prose-lg max-w-none text-gray-700 leading-relaxed'>
							{object.description.split('\n').map((paragraph, index) => (
								<p
									key={index}
									className='mb-6'
								>
									{paragraph}
								</p>
							))}
						</div>
					</motion.div>
				</Container>
			</section>

			{/* Contact CTA */}
			<ContactsCta t={t} />

			{/* Lightbox */}
			{object.images && object.images.length > 0 && (
				<Lightbox
					open={isLightboxOpen}
					close={() => setIsLightboxOpen(false)}
					slides={object.images.map(image => ({ src: image }))}
					index={selectedImage}
				/>
			)}
		</>
	)
}
