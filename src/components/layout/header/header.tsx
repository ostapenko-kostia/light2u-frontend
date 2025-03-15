import { MenuIcon } from 'lucide-react'
import { Logo } from '../../ui/logo'
import { Container } from '../container'
import { HeaderButtons } from './header-buttons'
import { HeaderLinks } from './header-links'
import { Dialog } from '@/components/ui/dialog'

export function Header() {
	return (
		<header className='py-3'>
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
					<HeaderLinks className='flex flex-col gap-8' />
				</Dialog>
				<Logo />
				<HeaderLinks className='max-md:hidden' />
				<HeaderButtons />
			</Container>
		</header>
	)
}
