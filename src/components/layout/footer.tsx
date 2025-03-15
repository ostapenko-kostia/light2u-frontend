import Link from 'next/link'
import { Container } from './container'

export function Footer() {
	return (
		<footer className='py-10 grow-0 shrink-0 bg-white w-full border-t border-gray-100'>
			<Container className='flex items-center justify-center'>
				<span className='text-center text-sm text-gray-500 select-none'>
					© {new Date().getFullYear()}, Light 2U. This website was developed by{' '}
					<Link
						href='https://t.me/khos_streks'
						target='_blank'
						className='text-blue-500 underline underline-offset-4 hover:text-blue-600 transition-colors duration-300'
					>
						Kostiantyn Ostapenko
					</Link>
				</span>
			</Container>
		</footer>
	)
}
