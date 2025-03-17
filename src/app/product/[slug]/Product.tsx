'use client'

import Link from 'next/link'

export function Product({
	product
}: {
	product: {
		id: number
		slug: string
		name: string
		images: string[]
		description: string
		price: number
		category: string
		materials: string
		dimensions: string
		weight: string
		power: string
		voltage: number
		bulb: string
		bulbColor: string
		bulbType: string
	}
}) {
	return (
		<>
			<div>
				<h1 className='text-4xl max-[500px]:!text-2xl'>{product.name}</h1>
				<p className='text-2xl font-light'>₴{product.price} грн</p>
			</div>

			<p className='text-md mt-2	 font-light'>{product.description}</p>

			<Link href='/buy'>
				<button className='border-black border hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer py-3 rounded-lg mt-8 w-full'>
					Як замовити?
				</button>
			</Link>

			<h3 className='text-2xl font-medium mt-8 text-[#121212BB] max-[500px]:!text-xl'>
				Технічні характеристики
			</h3>
			<ul className='flex flex-col gap-2 items-start text-start max-[500px]:!text-sm'>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>Матеріали:</span>
					<span className='font-light'>{product.materials}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>Габаритні розміри:</span>
					<span className='font-light'>{product.dimensions}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>Вага:</span>
					<span className='font-light'>{product.weight}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>Потужність:</span>
					<span className='font-light'>{product.power}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>Напруга:</span>
					<span className='font-light'>{product.voltage} В</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>Лампа:</span>
					<span className='font-light'>{product.bulb}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>Колір лампи:</span>
					<span className='font-light'>{product.bulbColor}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-medium text-[#121212BF]'>Тип лампи:</span>
					<span className='font-light'>{product.bulbType}</span>
				</li>
			</ul>
		</>
	)
}
