import { objectsService } from '@/services/objects.service'
import { notFound } from 'next/navigation'
import { Object } from './Object'

export default async function ObjectPage({
	params
}: {
	params: Promise<{ slug: string; locale: string }>
}) {
	const { slug, locale } = await params

	const object = await objectsService.getBySlug(slug)

	if (!object || object.locale !== locale) notFound()

	return (
		<section className='animation-opacity'>
			<Object object={object} />
		</section>
	)
}
