'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { IProduct } from '@/typing/interfaces'
import Link from 'next/link'

export function Product({ product }: { product: IProduct }) {
	const { t } = useTranslation()
	console.log(product.info.sort((a, b) => b.order - a.order))

	return (
		<>
			<div>
				<h1 className='text-4xl max-[500px]:!text-2xl'>{product.name}</h1>
				<p className='text-2xl font-light mt-4'>₴{product.price} грн</p>
			</div>

			<p className='text-md mt-2 font-light'>{product.description}</p>

			<div className='mt-8'>
				{product.quantity ? (
					<div>
						<span className='text-green-600'>{t('product-in-stock')}</span>{' '}
						<span>{product.quantity}</span> шт.
					</div>
				) : (
					<span className='text-red-600'>{t('product-out-stock')}</span>
				)}
			</div>

			<Link href='/contacts'>
				<button className='border-gray-400 border hover:bg-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer py-3 rounded-lg w-1/2'>
					{t('product-buy-button')}
				</button>
			</Link>

			{product.info.length > 0 && (
				<>
					<h3 className='text-2xl font-medium mt-8 text-[#121212BB] max-[500px]:!text-xl'>
						{t('product-info-title')}
					</h3>
					<ul className='flex flex-col gap-4 items-start text-start justify-start max-[500px]:!text-sm'>
						{!!product.info &&
							product.info
								.sort((a, b) => a.order - b.order)
								.map((i, index) => (
									<li
										key={index}
										className='flex items-start justify-start gap-2'
									>
										<span className='font-medium text-[#121212BF]'>{i.key}:</span>
										<span className='font-light'>{i.value}</span>
									</li>
								))}
					</ul>
				</>
			)}
		</>
	)
}
