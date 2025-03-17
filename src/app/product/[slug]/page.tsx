import { Container } from '@/components/layout/container'
import Image from 'next/image'
import { Product } from './Product'
import { ProductCard } from '@/components/layout/product-card'
import * as motion from 'framer-motion/client'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	const product = {
		id: 1,
		slug: 'ceiling-lamp-bubble-l',
		name: 'Ceiling Lamp Bubble L',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rerum iste pariatur cum quia et temporibus nostrum voluptas eaque, impedit culpa a nemo est commodi magni praesentium vero maxime ducimus consectetur adipisicing elit. Perspiciatis rerum iste pariatur cum!',
		images: ['/test6.webp', '/test5.webp', '/test4.webp'],
		category: 'Лампи',
		materials: 'Сталь, скло',
		dimensions: '100x100x100 см',
		weight: '1 кг',
		power: '100 Вт',
		voltage: 220,
		bulb: '100 Вт',
		bulbColor: 'Білий',
		bulbType: 'LED',
		price: 4800
	}

	return (
		<motion.section
			initial={{ translateY: '15px', opacity: 0 }}
			animate={{ translateY: '0px', opacity: 1 }}
			transition={{ duration: 0.7, ease: 'anticipate' }}
			className='py-12'
		>
			<Container className='grid grid-cols-[1.3fr_1fr] max-lg:grid-cols-2 max-md:grid-cols-1 gap-10'>
				<div className='w-full flex flex-col gap-5'>
					<Image
						src={product.images[0]}
						alt={product.name}
						width={5000}
						height={5000}
						className='w-full h-full aspect-square object-cover rounded-md'
					/>
					<div className='w-full h-full grid grid-cols-2 gap-2'>
						{product.images.slice(1).map(image => (
							<Image
								key={image}
								src={image}
								alt={product.name}
								width={1000}
								height={1000}
								className='w-full h-full aspect-square object-cover rounded-md'
							/>
						))}
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					<Product product={product} />
				</div>
			</Container>
			<Container className='flex flex-col gap-4 mt-8'>
				<h2 className='text-2xl font-medium text-[#121212cc]'>Схожі товари</h2>
				<div className='grid grid-cols-4 gap-4 max-md:grid-cols-2 max-[500px]:!grid-cols-1'>
					<ProductCard product={product} />
					<ProductCard product={product} />
					<ProductCard product={product} />
					<ProductCard product={product} />
				</div>
			</Container>
		</motion.section>
	)
}
