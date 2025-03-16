'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/container'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function HomeGallery() {
	const swiperRef = useRef<SwiperRef>(null)
	return (
		<motion.div
			className='py-12'
			initial={{ translateY: '15px', opacity: 0 }}
			animate={{ translateY: '0px', opacity: 1 }}
			transition={{ duration: 0.7, ease: 'anticipate' }}
		>
			<Container>
				<h2 className='text-xl uppercase tracking-wide'>Галерея</h2>
				<div className='flex items-center gap-4 w-full mt-6'>
					<button
						onClick={() => swiperRef.current?.swiper.slidePrev()}
						className='text-black text-xl cursor-pointer border-black max-[500px]:hidden border rounded-full p-2 hover:bg-black hover:text-white transition-all duration-300'
					>
						<ArrowLeft />
					</button>
					<Swiper
						ref={swiperRef}
						slidesPerView={3}
						spaceBetween={10}
						breakpoints={{
							1024: { slidesPerView: 3 },
							768: { slidesPerView: 2 },
							0: { slidesPerView: 1 }
						}}
						modules={[Pagination]}
						pagination={{ clickable: true }}
						loop
						navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
						className='w-full h-auto min-h-[400px]'
					>
						<SwiperSlide className='w-full h-full'>
							<Image
								src='/test3.webp'
								alt='test'
								width={1000}
								height={1000}
								loading='lazy'
								className='w-full h-full object-cover'
							/>
						</SwiperSlide>
						<SwiperSlide className='w-full h-full'>
							<Image
								src='/test4.webp'
								alt='test'
								width={1000}
								height={1000}
								loading='lazy'
								className='w-full h-full object-cover'
							/>
						</SwiperSlide>
						<SwiperSlide className='w-full h-full'>
							<Image
								src='/test5.webp'
								alt='test'
								width={1000}
								height={1000}
								loading='lazy'
								className='w-full h-full object-cover'
							/>
						</SwiperSlide>
					</Swiper>
					<button
						onClick={() => swiperRef.current?.swiper.slideNext()}
						className='text-black text-xl cursor-pointer max-[500px]:hidden border-black border rounded-full p-2 hover:bg-black hover:text-white transition-all duration-300'
					>
						<ArrowRight />
					</button>
				</div>
			</Container>
		</motion.div>
	)
}
