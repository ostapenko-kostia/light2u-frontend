import {
	AboutHero,
	AboutIntroduction,
	AboutPhilosophy,
	AboutProcess,
	AboutCta
} from '@/components/about'
import { getServerTranslation } from '@/lib/server-translation'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const { t } = await getServerTranslation(locale)
	return (
		<div className='min-h-screen animation-opacity'>
			<AboutHero t={t} />
			<AboutIntroduction t={t} />
			<AboutPhilosophy t={t} />
			<AboutProcess t={t} />
			<AboutCta t={t} />
		</div>
	)
}
