import { useState } from 'react'
import { AdminObjectsList } from './admin-objects-list'
import { IObject } from '@/typing/interfaces'

interface Props {
	objects: IObject[] | undefined
}

export function AdminObjectsTab({ objects }: Props) {
	const [currentLocale, setCurrentLocale] = useState<'uk' | 'ru'>('uk')

	const ukObjects = objects?.filter(object => object.locale === 'uk' || !object.locale)
	const ruObjects = objects?.filter(object => object.locale === 'ru')

	const filteredObjects = currentLocale === 'uk' ? ukObjects : ruObjects

	return (
		<div className='p-4 animate-opacity-1'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-semibold'>Об'єкти</h2>
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
			<AdminObjectsList
				objects={filteredObjects}
				locale={currentLocale}
			/>
		</div>
	)
}
