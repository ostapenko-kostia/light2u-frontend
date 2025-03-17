import { Container } from '@/components/layout/container'
import * as motion from 'framer-motion/client'
import { MailIcon, PhoneIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PARTNERS } from './buy.data'

export default function BuyPage() {
	return (
		<motion.section
			className='py-12'
			initial={{ translateY: '15px', opacity: 0 }}
			animate={{ translateY: '0px', opacity: 1 }}
			transition={{ duration: 0.7, ease: 'anticipate' }}
		>
			<Container>
				<h2 className='text-4xl font-medium text-center'>Де купити?</h2>
				<div className='grid grid-cols-4 gap-10 mt-10 max-xl:grid-cols-2 max-sm:grid-cols-1'>
					{PARTNERS.map((partner, index) => (
						<div
							className='w-full h-full bg-gray-50 rounded-b-lg'
							key={index}
						>
							<div className='w-full aspect-square'>
								<Image
									src={partner.image}
									alt={partner.name}
									width={1000}
									height={1000}
									className='w-full h-full object-cover rounded-t-lg'
								/>
							</div>
							<div className='p-4'>
								<h3 className='text-lg font-medium'>{partner.name}</h3>
								<div className='flex items-center gap-2 mt-3'>
									<PhoneIcon
										className='text-gray-500'
										size={16}
									/>
									<p className='text-sm text-gray-500'>{partner.phone}</p>
								</div>
								<div className='flex items-center gap-2 mt-1'>
									<MailIcon
										className='text-gray-500'
										size={16}
									/>
									<p
										className='text-sm text-gray-500 text-wrap'
										style={{ wordBreak: 'break-word' }}
									>
										{partner.email}
									</p>
								</div>
								<Link
									href={partner.instagram}
									target='_blank'
									className='mt-3 flex items-center gap-2 px-5 py-1.5 border-black rounded-lg border w-min hover:bg-black hover:text-white transition-colors duration-200'
								>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<rect
											x='2'
											y='2'
											width='20'
											height='20'
											rx='5'
											ry='5'
										/>
										<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
										<line
											x1='17.5'
											y1='6.5'
											x2='17.51'
											y2='6.5'
										/>
									</svg>
									Instagram
								</Link>
							</div>
						</div>
					))}
				</div>
			</Container>
		</motion.section>
	)
}
