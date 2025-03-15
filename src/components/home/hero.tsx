'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container } from '../layout/container'

export function Hero() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 1 } }}
			className='h-[60vh]'
		>
			<Swiper
				spaceBetween={0}
				loop
				className={clsx('overflow-hidden h-full')}
				slidesPerView={1}
			>
				<SwiperSlide className='w-full h-full pt-20 pb-10 max-sm:py-12 text-center relative'>
					<div className='absolute w-full h-full inset-0 top-0 left-0 -z-10'>
						<div className='relative w-full h-full inset-0 top-0 left-0'>
							<Image
								src={'/test.webp'}
								alt={''}
								fill
								sizes='100%, 100%'
								// priority={index === 0}
								// loading={index === 0 ? 'eager' : 'lazy'}
								className='object-cover object-[50%_50%]'
							/>
						</div>
					</div>

					<div className='w-full h-full px-8 flex flex-col justify-between items-start gap-7'>
						<Container className='p-5 rounded-xl'>
							<h2 className='font-light text-2xl tracking-wider uppercase text-start w-min text-nowrap max-[500px]:!w-full max-[500px]:text-wrap'>
								{/* {slide.text} */} Лорем іпсум долор сіт амет
							</h2>
							<p className='text-start font-light text-sm mt-4 w-1/3 max-md:w-full'>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore possimus modi
								cumque deserunt eos nam distinctio earum error vel? Dolorem aperiam possimus optio
								a, laboriosam fugit reprehenderit magnam nam? Amet.
							</p>
						</Container>
						<Container className='flex items-start'>
							<button className='border-black border bg-[#ffffff40] rounded-lg text-black'>
								<Link
									href={'/catalog'}
									className='w-full h-full block px-10 py-3 max-sm:px-14'
								>
									Переглянути
								</Link>
							</button>
						</Container>
					</div>
				</SwiperSlide>
			</Swiper>
		</motion.div>
	)
}
