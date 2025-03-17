import { Container } from '@/components/layout/container'
import { ProductCard } from '@/components/layout/product-card'
import Link from 'next/link'
import * as motion from 'framer-motion/client'

export default function CatalogPage() {
	const products = [
		{
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
	]
	return (
		<section className='py-12'>
			<Container>
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='text-4xl uppercase tracking-wide'
				>
					Всі товари
				</motion.h1>
				<motion.ul
					initial={{ translateY: '15px', opacity: 0 }}
					animate={{ translateY: '0px', opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='flex items-center gap-x-12 gap-y-6 mt-6 uppercase text-sm tracking-wide max-sm:text-center max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-6 max-sm:gap-y-4 max-[400px]:!grid-cols-1'
				>
					<li className='hover:underline underline-offset-4'>
						<Link href='/catalog'>Всі</Link>
					</li>
					<li className='hover:underline underline-offset-4'>
						<Link href='/catalog?category=lamps'>Ванна</Link>
					</li>
					<li className='hover:underline underline-offset-4'>
						<Link href='/catalog?category=rings'>Кільця</Link>
					</li>
					<li className='hover:underline underline-offset-4'>
						<Link href='/catalog?category=tracks'>Треки</Link>
					</li>
					<li className='hover:underline underline-offset-4'>
						<Link href='/catalog?category=spotlights'>Споти</Link>
					</li>
					<li className='hover:underline underline-offset-4'>
						<Link href='/catalog?category=lusters'>Люстри</Link>
					</li>
					<li className='hover:underline underline-offset-4'>
						<Link href='/catalog?category=lamps'>Лампи</Link>
					</li>
				</motion.ul>
				<motion.section
					initial={{ translateY: '15px', opacity: 0 }}
					animate={{ translateY: '0px', opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[400px]:!grid-cols-1 gap-6 w-full mt-12'
				>
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
					<ProductCard product={products[0]} />
				</motion.section>
			</Container>
		</section>
	)
}
