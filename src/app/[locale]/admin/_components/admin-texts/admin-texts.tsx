'use client'

import { useState } from 'react'
import { AdminEditText } from './admin-edit-text'
import { ITextField } from '@/typing/interfaces'

interface Props {
	texts: ITextField[] | undefined
}

const textGroups = {
	header: 'Шапка',
	footer: 'Футер',
	home: 'Головна сторінка',
	catalog: 'Каталог',
	product: 'Сторінка товару',
	about: 'Про нас',
	contacts: 'Контакти',
	object: 'Сторінка об’єкту',
	other: 'Інше'
}

export function AdminTextFieldsTab({ texts }: Props) {
	const [currentLocale, setCurrentLocale] = useState<'uk' | 'ru'>('uk')

	const filteredTexts = texts?.filter(text => text.locale === currentLocale)

	const groupedTexts: Record<string, ITextField[]> = {}

	filteredTexts?.forEach(text => {
		const slugParts = text.slug.split('-')
		const groupKey = slugParts[0]

		if (Object.keys(textGroups).includes(groupKey)) {
			if (!groupedTexts[groupKey]) {
				groupedTexts[groupKey] = []
			}
			groupedTexts[groupKey].push(text)
		} else {
			if (!groupedTexts['other']) {
				groupedTexts['other'] = []
			}
			groupedTexts['other'].push(text)
		}
	})

	return (
		<div className='p-4 animate-opacity-1'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-semibold'>Текстові поля</h2>
				<div className='flex gap-4'>
					<button
						className={`px-4 py-2 font-medium transition-colors ${
							currentLocale === 'uk'
								? 'text-blue-500 border-b-2 border-blue-500'
								: 'hover:text-blue-400'
						}`}
						onClick={() => setCurrentLocale('uk')}
					>
						Українська
					</button>
					<button
						className={`px-4 py-2 font-medium transition-colors ${
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

			{Object.entries(groupedTexts).map(([groupKey, groupTexts]) => (
				<div
					key={groupKey}
					className='mb-8'
				>
					<h3 className='text-xl font-medium mb-4 text-gray-700 border-b pb-2'>
						{textGroups[groupKey as keyof typeof textGroups]}
					</h3>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										ID
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Slug
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Текст
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Дата створення
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Останнє оновлення
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Дії
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{groupTexts
									?.sort((a, b) => a.id - b.id)
									?.map(text => {
										const clippedText =
											text.text.length > 40 ? text.text.slice(0, 40) + '...' : text.text
										return (
											<tr key={text.id}>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
													{text.id}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
													{text.slug}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
													{clippedText}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
													{new Date(text.createdAt).toLocaleDateString()}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
													{new Date(text.updatedAt).toLocaleDateString()}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
													<AdminEditText text={text} />
												</td>
											</tr>
										)
									})}
							</tbody>
						</table>
					</div>
				</div>
			))}

			{Object.keys(groupedTexts).length === 0 && (
				<div className='text-center py-10 text-gray-500'>
					Для мови {currentLocale === 'uk' ? 'українська' : 'російська'} не знайдено текстових полів
				</div>
			)}
		</div>
	)
}
