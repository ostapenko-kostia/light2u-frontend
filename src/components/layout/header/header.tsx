import { MenuIcon } from 'lucide-react'
import { Logo } from '../../ui/logo'
import { Container } from '../container'
import { HeaderButtons } from './header-buttons'
import { HeaderLinks } from './header-links'
import { Dialog } from '@/components/ui/dialog'
import { HeaderLangSwitcher } from './header-lang-switcher'

export async function Header({ locale }: { locale: string }) {
	return (
		<header className='py-3 bg-white grow-0 shrink-0 border-b border-gray-100'>
			<Container className='flex items-center justify-between'>
				<Dialog
					title='Меню'
					trigger={
						<button className='md:hidden'>
							<MenuIcon
								strokeWidth={1}
								size={32}
							/>
						</button>
					}
				>
					<HeaderLinks className='flex flex-col gap-8' locale={locale} />
					<HeaderButtons locale={locale} className='flex gap-2 mt-6 justify-center items-center' />
				</Dialog>
				<Logo locale={locale} className='max-md:mr-auto max-md:ml-5' />
				<HeaderLinks className='max-md:hidden' locale={locale} />
				<div className='flex items-center gap-2'>
					<HeaderButtons locale={locale} className='max-md:hidden' />
					<HeaderLangSwitcher />
				</div>
			</Container>
		</header>
	)
}
