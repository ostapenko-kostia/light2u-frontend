import { Container } from '@/components/layout/container'
import Image from 'next/image'
import * as motion from 'framer-motion/client'

export default function AboutPage() {
	return (
		<section className='py-6'>
			<motion.h2
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.7, ease: 'anticipate' }}
				className='text-center text-2xl font-bold mb-10'
			>
				Про Нас
			</motion.h2>
			<Container className='grid grid-cols-[1fr_2fr] max-lg:grid-cols-2 max-md:grid-cols-1 gap-10'>
				<motion.div
					initial={{ translateY: '15px', opacity: 0 }}
					animate={{ translateY: '0px', opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='relative w-full h-full'
				>
					<Image
						src='/test5.webp'
						alt='About'
						width={1000}
						height={1000}
						priority
						className='object-cover w-full h-full aspect-square max-md:hidden'
					/>
				</motion.div>
				<motion.div
					initial={{ translateY: '15px', opacity: 0 }}
					animate={{ translateY: '0px', opacity: 1 }}
					transition={{ duration: 0.7, ease: 'anticipate' }}
					className='text-center w-full'
				>
					<b>"Illuminating life with aesthetics"</b> is not just our slogan, but a goal in every
					item we create. Our mission is to bring not only light, but also beauty, harmony and
					elegance to your space. The task is to make each of our customers feel the uniqueness of
					their space thanks to our lighting.{' '}
					<b>We create an atmosphere where every moment becomes special. </b>
					<ul className='py-5 flex flex-col gap-3'>
						<li>
							• We believe that every space has its own story and every shade plays its role. You
							can choose the color of the lamp, which will perfectly fit into your design.
						</li>
						<li>
							• Our products are not only lamps, but also a creative expression of your style. We
							offer the possibility of adapting each product to individual wishes.
						</li>
						<li>
							• We believe in the power of interaction. Our team is always ready to listen to your
							ideas, providing advice and ensuring the maximum level of communication at every
							stage.
						</li>
						<li>
							• We have no standards - only endless possibilities. We are flexible and creative,
							ready to turn any of your ideas into reality.
						</li>
						<li>
							• Our goal is your complete satisfaction. We guarantee the quality and reliability of
							our products, as well as a high level of service, solving any questions and complaints
							quickly and efficiently.{' '}
						</li>
						<li>
							• At <b>Light 2U</b> they understand the value of time. Our high production speed
							ensures that you will receive your individually adapted light fixture faster than you
							expect.{' '}
						</li>
						<li>• We don't just offer products, we create partnerships.</li>
						<li>
							Looking forward to a long-term relationship with babich.studio - where your uniqueness
							and our creativity come together, creating a unique design for your space.
						</li>
					</ul>
				</motion.div>
			</Container>
		</section>
	)
}
