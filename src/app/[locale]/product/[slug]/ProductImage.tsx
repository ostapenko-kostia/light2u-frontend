'use client'

import { IProduct } from '@/typing/interfaces'
import { Maximize2 } from 'lucide-react'
import { useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

export function ProductImage({ product }: { product: IProduct }) {
	const [isOpen, setIsOpen] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const swiperRef = useRef<SwiperRef>(null)

	const handleSlideChange = (swiper: any) => {
		setActiveIndex(swiper.realIndex)
	}

	return (
		<div className='flex flex-col gap-4 w-full max-w-2xl mx-auto'>
			<div className='relative'>
				<Swiper
					ref={swiperRef}
					spaceBetween={10}
					navigation={true}
					modules={[Navigation]}
					onSlideChange={handleSlideChange}
					className='w-full rounded-md select-none'
				>
					{product.images.map((image, index) => (
						<SwiperSlide key={image}>
							<div className='aspect-square w-full'>
								<img
									src={image}
									alt={`${product.name} - фото ${index + 1}`}
									width={5000}
									height={5000}
									className='object-cover rounded-md w-full h-full'
								/>
								<button
									onClick={() => setIsOpen(true)}
									className='absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors duration-300'
								>
									<Maximize2 className='w-5 h-5' />
								</button>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<Lightbox
				open={isOpen}
				close={() => setIsOpen(false)}
				slides={product.images.map(image => ({ src: image }))}
				index={activeIndex}
			/>
		</div>
	)
}
