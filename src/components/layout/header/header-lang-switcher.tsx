'use client'

import Select from 'react-select'
import { customStyles } from './header-select.styles'
import dynamic from 'next/dynamic'

function HeaderLangSwitcherComponent({ className }: { className?: string }) {
	return (
		<Select
			className={className}
			defaultValue={{ value: 'ua', label: 'UA' }}
			styles={customStyles}
			isSearchable={false}
			options={[
				{ value: 'ua', label: 'UA' },
				{ value: 'ru', label: 'RU' }
			]}
		/>
	)
}

export const HeaderLangSwitcher = dynamic(() => Promise.resolve(HeaderLangSwitcherComponent), {
	ssr: false
})
