import { Container } from '@/components/layout/container'
import * as motion from 'framer-motion/client'

export function ContactsHours({ t }: { t: (key: string) => string }) {
	return (
		<section className='py-16 bg-gray-100'>
			<Container>
				<motion.div
					className='text-center mb-12'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
				>
					<h2 className='text-3xl font-bold mb-4'>{t('contacts-hours-title')}</h2>
					<p className='max-w-2xl mx-auto text-gray-600'>{t('contacts-hours-desc')}</p>
				</motion.div>

				<div className='max-w-2xl mx-auto'>
					<motion.div
						className='bg-white rounded-lg shadow-md overflow-hidden'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<table className='min-w-full'>
							<tbody>
								{[
									{ day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
									{ day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
									{ day: 'Sunday', hours: '11:00 AM - 5:00 PM' }
								].map((item, index) => (
									<tr
										key={index}
										className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
									>
										<td className='py-4 px-6 font-medium'>
											{t(`contacts-hours-day-${index + 1}`)}
										</td>
										<td className='py-4 px-6 text-right'>
											{t(`contacts-hours-time-${index + 1}`)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</motion.div>
				</div>
			</Container>
		</section>
	)
}
