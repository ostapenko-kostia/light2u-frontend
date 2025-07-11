'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container } from '../layout/container'
import { ISlide } from '@/typing/interfaces'

export function Hero({ slides }: { slides: ISlide[] | undefined }) {
	return (
		<motion.div
			initial={{ translateY: '15px', opacity: 0 }}
			animate={{ translateY: '0px', opacity: 1 }}
			transition={{ duration: 0.7, ease: 'anticipate' }}
			className='h-[60vh]'
		>
			<Swiper
				spaceBetween={0}
				loop
				className={clsx('overflow-hidden h-full')}
				slidesPerView={1}
			>
				{slides?.map((slide, index) => (
					<SwiperSlide
						key={index}
						className='w-full h-full pt-20 pb-10 max-sm:py-12 text-center relative'
					>
						<div className='absolute w-1/2 h-full inset-0 top-0 left-1/2 -z-10'>
							<div className='relative w-full h-full inset-0 top-0 left-0'>
								<Image
									src={
										!!slide.background && slide.background?.length > 0
											? slide.background
											: '/placeholder.svg'
									}
									alt={slide.text}
									fill
									sizes='100%, 100%'
									priority
									className='object-cover object-[100%_20%]'
								/>
							</div>
						</div>

						<div className='w-full h-full px-8 flex flex-col justify-between items-start gap-7'>
							<Container className='p-5 rounded-xl'>
								<h2 className='font-light text-2xl tracking-wider uppercase text-start w-min text-nowrap max-[500px]:!w-full max-[500px]:text-wrap'>
									{slide.text}
								</h2>
								<p className='text-start font-light text-sm mt-4 w-1/3 max-md:w-full'>
									{slide.description}
								</p>
							</Container>
							<Container className='flex items-start'>
								<button className='border-black border bg-[#ffffff40] rounded-lg text-black'>
									<Link
										href={slide.url}
										className='w-full h-full block px-10 py-3 max-sm:px-14'
									>
										Переглянути
									</Link>
								</button>
							</Container>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</motion.div>
	)
}
