import * as motion from 'framer-motion/client'
import Image from 'next/image'
import { Container } from '@/components/layout/container'

export function AboutIntroduction({ t }: { t: (key: string) => string }) {
	return (
		<section className='py-20 bg-white'>
			<Container>
				<div className='flex flex-wrap'>
					<div className='w-full md:w-1/2 p-4'>
						<motion.div
							className='mb-8'
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7 }}
						>
							<h2 className='text-3xl font-bold border-b-2 border-amber-400 inline-block pb-2 mb-6'>
								{t('about-who-we-are')}
							</h2>
							<p className='text-lg leading-relaxed mb-4'>
								{t('about-story-p1')}
							</p>
							<p className='text-lg leading-relaxed'>
								{t('about-story-p2')}
							</p>
						</motion.div>
					</div>
					<div className='w-full md:w-1/2 p-4'>
						<div className='grid grid-cols-2 gap-4 h-full'>
							<motion.div
								className='relative h-full'
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<Image
									src='/placeholder.svg'
									alt='Modern lighting fixture'
									fill
									className='object-cover rounded-lg shadow-lg'
								/>
							</motion.div>
							<motion.div
								className='relative h-full'
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.4 }}
							>
								<Image
									src='/placeholder.svg'
									alt='Contemporary chandelier'
									fill
									className='object-cover rounded-lg shadow-lg'
								/>
							</motion.div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}
