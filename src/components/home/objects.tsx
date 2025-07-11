import { getServerTranslation } from '@/lib/server-translation'
import { IObject } from '@/typing/interfaces'
import * as motion from 'framer-motion/client'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '../layout/container'

export async function HomeObjects({
	objects,
	locale
}: {
	objects: IObject[] | undefined
	locale: string
}) {
	const { t } = await getServerTranslation(locale)
	return (
		<motion.div
			className='py-16 bg-gradient-to-b from-white to-gray-50'
			initial={{ translateY: '15px', opacity: 0 }}
			animate={{ translateY: '0px', opacity: 1 }}
			transition={{ duration: 0.7, ease: 'anticipate' }}
		>
			<Container>
				<header className='text-center mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>{t('home-objects-title')}</h2>
				</header>
				<section className='grid grid-cols-4 gap-8 w-full max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
					{objects?.map((object, index) => (
						<motion.article
							className='group'
							key={object.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Link
								href={`/object/${object.slug}`}
								className='block w-full h-full'
							>
								<div className='relative w-full h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2'>
									{/* Image Container */}
									<div className='relative w-full aspect-[4/3] overflow-hidden'>
										<Image
											src={object.images[0]}
											alt={object.name}
											fill
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
											priority={index < 4}
											className='object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
										/>
										{/* Gradient Overlay */}
										<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

										{/* Location Badge */}
										<div className='absolute top-4 left-4'>
											<div className='bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-lg'>
												📍 {object.city}
											</div>
										</div>

										{/* Hover Info Overlay */}
										<div className='absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
											<div className='space-y-2 bg-black/70 rounded-2xl p-3 w-min text-nowrap'>
												<p className='text-sm opacity-90'>{object.address}</p>
											</div>
										</div>
									</div>

									{/* Content */}
									<div className='p-6'>
										<h3 className='text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300'>
											{object.name}
										</h3>
										<p className='text-gray-600 text-sm line-clamp-2 mb-4'>{object.description}</p>
									</div>

									{/* Hover Border Effect */}
									<div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-colors duration-300 pointer-events-none' />
								</div>
							</Link>
						</motion.article>
					))}
				</section>
			</Container>
		</motion.div>
	)
}
