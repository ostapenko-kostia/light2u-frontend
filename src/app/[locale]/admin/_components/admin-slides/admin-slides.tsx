import { useState } from 'react'
import { AdminSlidesList } from './admin-slides-list'
import { ISlide } from '@/typing/interfaces'

interface Props {
	slides: ISlide[] | undefined
}

export function AdminSlidesTab({ slides }: Props) {
	const [currentLocale, setCurrentLocale] = useState<'uk' | 'ru'>('uk')

	// Фільтрація слайдів за локаллю
	const ukSlides = slides?.filter(slide => slide.locale === 'uk' || !slide.locale)
	const ruSlides = slides?.filter(slide => slide.locale === 'ru')

	// Вибір слайдів відповідно до обраної локалі
	const filteredSlides = currentLocale === 'uk' ? ukSlides : ruSlides

	return (
		<div className='p-4 animate-opacity-1'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-semibold'>Слайди</h2>
				<div className='flex gap-4'>
					<button
						className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
							currentLocale === 'uk'
								? 'text-blue-500 border-b-2 border-blue-500'
								: 'hover:text-blue-400'
						}`}
						onClick={() => setCurrentLocale('uk')}
					>
						Українська
					</button>
					<button
						className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
							currentLocale === 'ru'
								? 'text-blue-500 border-b-2 border-blue-500'
								: 'hover:text-blue-400'
						}`}
						onClick={() => setCurrentLocale('ru')}
					>
						Російська
					</button>
				</div>
			</div>
			<AdminSlidesList
				slides={filteredSlides}
				locale={currentLocale}
			/>
		</div>
	)
}
