'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Product as ProductType } from '@prisma/client'
import Link from 'next/link'

export function Product({ product }: { product: ProductType }) {
	const { t } = useTranslation()

	return (
		<>
			<div>
				<h1 className='text-4xl max-[500px]:!text-2xl'>{product.name}</h1>
				<p className='text-2xl font-light'>₴{product.price} грн</p>
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
			<ul className='flex flex-col gap-2 items-start text-start max-[500px]:!text-sm'>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>{t('product-materials-field')}:</span>
					<span className='font-light'>{product.materials}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>{t('product-size-field')}:</span>
					<span className='font-light'>{product.dimensions}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>{t('product-weight-field')}:</span>
					<span className='font-light'>{product.weight}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>{t('product-power-field')}:</span>
					<span className='font-light'>{product.power}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>{t('product-voltage-field')}:</span>
					<span className='font-light'>{product.voltage} В</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>{t('product-bulb-field')}:</span>
					<span className='font-light'>{product.bulb}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>{t('product-bulb-color-field')}:</span>
					<span className='font-light'>{product.bulbColor}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>{t('product-bulb-type-field')}:</span>
					<span className='font-light'>{product.bulbType}</span>
				</li>
			</ul>
		</>
	)
}
