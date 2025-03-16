'use client'

import { DialogContext } from '@/components/ui/dialog'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { useContext } from 'react'

export function HeaderLinks({ className }: { className?: string }) {
	const pathname = usePathname()
	const dialogValues = useContext(DialogContext)
	const closeDialog = dialogValues?.closeDialog

	return (
		<ul className={clsx(className, 'flex items-center gap-6 font-light tracking-wider')}>
			<li
				className={clsx('hover:underline underline-offset-4', {
					'font-normal underline': !!match('/')(pathname)
				})}
			>
				<Link
					onClick={() => closeDialog?.()}
					href='/'
				>
					Головна
				</Link>
			</li>
			<li
				className={clsx('hover:underline underline-offset-4', {
					'font-normal underline': !!match('/catalog')(pathname)
				})}
			>
				<Link
					onClick={() => closeDialog?.()}
					href='/catalog'
				>
					Каталог
				</Link>
			</li>
			<li
				className={clsx('hover:underline underline-offset-4', {
					'font-normal underline': !!match('/about')(pathname)
				})}
			>
				<Link
					onClick={() => closeDialog?.()}
					href='/about'
				>
					Про Нас
				</Link>
			</li>
			<li
				className={clsx('hover:underline underline-offset-4', {
					'font-normal underline': !!match('/contacts')(pathname)
				})}
			>
				<Link
					onClick={() => closeDialog?.()}
					href='/contacts'
				>
					Контакти
				</Link>
			</li>
			<li
				className={clsx('hover:underline underline-offset-4', {
					'font-normal underline': !!match('/buy')(pathname)
				})}
			>
				<Link
					onClick={() => closeDialog?.()}
					href='/buy'
				>
					Де купити?
				</Link>
			</li>
		</ul>
	)
}
