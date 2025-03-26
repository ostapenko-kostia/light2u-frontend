import { Popup } from '@/components/ui/popup'
import { getServerTranslation } from '@/lib/server-translation'
import clsx from 'clsx'
import { SearchIcon } from 'lucide-react'

export async function HeaderButtons({ className, locale }: { className?: string, locale: string }) {
	const { t } = await getServerTranslation(locale)

	return (
		<div className={clsx('flex items-center gap-4', className)}>
			<Popup
				title={t('header-search-placeholder')}
				trigger={
					<button className='cursor-pointer hover:scale-110 transition-transform duration-300'>
						<SearchIcon strokeWidth={1.5} />
					</button>
				}
			>
				<search className='mx-auto w-[750px] h-[80px] max-sm:h-16 max-lg:w-full'>
					<form
						action='/catalog'
						className='relative w-full h-full'
					>
						<input
							className='w-full pl-16 border border-gray-300 h-full rounded-full'
							type='search'
							placeholder={t('header-search-placeholder')}
							name='search'
						/>
						<button
							type='submit'
							className='absolute top-1/2 -translate-y-1/2 left-6'
						>
							<SearchIcon />
						</button>
					</form>
				</search>
			</Popup>
		</div>
	)
}
