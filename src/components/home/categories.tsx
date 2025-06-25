import { getServerTranslation } from '@/lib/server-translation'
import * as motion from 'framer-motion/client'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '../layout/container'
import { IFirstLevelCategory } from '@/typing/interfaces'

export async function HomeCategories({
	categories,
	locale
}: {
	categories: IFirstLevelCategory[] | undefined
	locale: string
}) {
	const { t } = await getServerTranslation(locale)
	return (
		<motion.div
			className='py-12'
			initial={{ translateY: '15px', opacity: 0 }}
			animate={{ translateY: '0px', opacity: 1 }}
			transition={{ duration: 0.7, ease: 'anticipate' }}
		>
			<Container>
				<h2 className='text-xl uppercase tracking-wide'>{t('home-categories-title')}</h2>
				<section className='grid grid-cols-4 gap-8 w-full pt-6 max-xl:grid-cols-3 max-md:grid-cols-2 max-[350px]:!grid-cols-1'>
					{categories?.map(category => (
						<article
							className='w-full h-full group'
							key={category.id}
						>
							<Link
								href={`/catalog?firstLevelCategory=${category.slug}`}
								className='w-full h-full flex flex-col gap-3'
							>
								<div className='relative w-full h-full rounded-sm aspect-square overflow-hidden'>
									<Image
										src={category.image}
										alt={(category.name as any)[locale]}
										fill
										sizes='100%, 100%'
										priority
										className='object-cover aspect-square rounded-sm group-hover:scale-110 group-hover:brightness-90 transition-all duration-1000'
									/>
								</div>
								<h3 className='text-lg'>{(category.name as any)[locale]}</h3>
							</Link>
						</article>
					))}
				</section>
			</Container>
		</motion.div>
	)
}
