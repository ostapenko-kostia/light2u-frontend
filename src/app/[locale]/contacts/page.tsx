import { getServerTranslation } from '@/lib/server-translation'
import {
	ContactsHero,
	ContactsInfo,
	ContactsMap,
	ContactsCta,
	ContactsHours,
	ContactForm
} from '@/components/contacts'
import { Container } from '@/components/layout/container'

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const { t } = await getServerTranslation(locale)

	return (
		<div className='min-h-screen animation-opacity'>
			<ContactsHero t={t} />
			<ContactsInfo t={t} />
			<Container className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
				<ContactsMap t={t} />
				<ContactForm />
			</Container>
			<ContactsHours t={t} />
			<ContactsCta t={t} />
		</div>
	)
}
