import Image from 'next/image'
import { AdminObjectCreate } from './admin-create-object'
import { AdminDeleteObject } from './admin-delete-object'
import { AdminObjectEdit } from './admin-edit-object'
import { IObject } from '@/typing/interfaces'

interface Props {
	objects: IObject[] | undefined
	locale: 'uk' | 'ru'
}

export function AdminObjectsList({ objects, locale }: Props) {
	return (
		<div className='grid grid-cols-3 mt-5 w-full gap-10 max-xl:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1'>
			{objects?.map(object => (
				<div
					className='relative'
					key={object.id}
				>
					<div className='absolute z-10 bg-white flex items-center gap-3 justify-center p-2 right-2 rounded-b-md'>
						<AdminObjectEdit object={object} />
						<AdminDeleteObject id={object.id} />
					</div>
					<div>
						<div className='relative w-full aspect-square'>
							<Image
								src={object.images[0]}
								alt={object.name}
								fill
								sizes='100%, 100%'
								className='object-cover rounded-lg'
							/>
						</div>
						<h3 className='my-2 text-xl font-medium'>{object.name}</h3>
						<p className='text-sm text-gray-700 mb-1'>
							<span className='font-semibold'>Місто:</span> {object.city}
						</p>
						<p className='text-sm'>
							<span className='font-semibold'>Адреса:</span> {object.address}
						</p>
					</div>
				</div>
			))}
			<AdminObjectCreate locale={locale} />
		</div>
	)
}
