import { Dialog } from '@/components/ui/dialog'
import { Product } from '@prisma/client'
import { InfoIcon } from 'lucide-react'

interface Props {
	product: Product
	categoryName: string
}

const stringifyWithoutQuotes = (value: any): string => {
	if (value === null || value === undefined) return ''
	if (Array.isArray(value)) return value.join(', ')
	if (typeof value === 'object') return JSON.stringify(value)
	return String(value)
}

export function AdminProductInfo({ product, categoryName }: Props) {
	const keysToDisplay: Record<string, string> = {
		id: 'ID',
		name: 'Назва',
		price: 'Ціна',
		categorySlug: 'Slug категорї',
		images: 'Зображення',
		slug: 'Slug',
		description: 'Опис',
		materials: 'Матеріали',
		dimensions: 'Розміри',
		weight: 'Вага',
		power: 'Потужність',
		voltage: 'Напруга',
		bulb: 'Лампочка',
		bulbColor: 'Колір лампочки',
		bulbType: 'Тип лампочки',
		createdAt: 'Дата створення',
		updatedAt: 'Дата оновлення'
	}

	return (
		<Dialog
			title={product.name}
			trigger={
				<button>
					<InfoIcon />
				</button>
			}
		>
			<ul>
				<li className='my-2 [&_span]:text-neutral-500 text-lg'>
					<span className='!text-black'>Категорія:</span> <span>{categoryName}</span>
				</li>
				{Object.entries(product)
					.filter(i => i[0] !== 'images')
					.map(([key, value]) => (
						<li
							className='my-2 [&_span]:text-neutral-500 text-lg'
							key={key}
						>
							<span className='!text-black'>{keysToDisplay[key]}:</span>{' '}
							<span>{stringifyWithoutQuotes(value)}</span>
						</li>
					))}
			</ul>
		</Dialog>
	)
}
