import clsx from 'clsx'
import { PropsWithChildren } from 'react'

export function Container({ className, children }: PropsWithChildren<{ className?: string }>) {
	return (
		<div className={clsx(className, 'w-[1440px] max-2xl:w-full max-2xl:px-8 mx-auto')}>
			{children}
		</div>
	)
}
