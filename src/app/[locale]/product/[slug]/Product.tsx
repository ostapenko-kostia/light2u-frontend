'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Product as ProductType } from '@prisma/client'
import Link from 'next/link'

interface ProductWithInfo extends ProductType {
	info: {
		key: string
		value: string
	}[]
}

export function Product({ product }: { product: ProductWithInfo }) {
	const { t } = useTranslation()

	return (
		<>
			<div>
				<h1 className='text-4xl max-[500px]:!text-2xl'>{product.name}</h1>
				<p className='text-2xl font-light mt-4'>₴{product.price} грн</p>
			</div>

			<p className='text-md mt-2 font-light'>{product.description}</p>

			<Link href='/contacts'>
				<button className='border-black border hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer py-3 rounded-lg mt-8 w-full'>
					{t('product-buy-button')}
				</button>
			</Link>

			<h3 className='text-2xl font-medium mt-8 text-[#121212BB] max-[500px]:!text-xl'>
				{t('product-info-title')}
			</h3>
			<ul className='flex flex-col gap-4 items-start text-start justify-start max-[500px]:!text-sm'>
				{product.info &&
					product.info.map(i => (
						<li
							key={i.key}
							className='flex items-start justify-start gap-2'
						>
							<span className='font-medium text-[#121212BF]'>{i.key}:</span>
							<span className='font-light'>{i.value}</span>
						</li>
					))}
			</ul>
		</>
	)
}
