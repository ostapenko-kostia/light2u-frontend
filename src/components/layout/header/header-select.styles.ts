import { StylesConfig } from 'react-select'

const MONOCHROME = {
	black: '#000000',
	white: '#FFFFFF',
	gray: '#F5F5F5',
	darkGray: '#E5E5E5'
}

export const customStyles: StylesConfig = {
	control: provided => ({
		...provided,
		border: 'none',
		boxShadow: 'none',
		backgroundColor: 'transparent',
		fontSize: '18px',
		color: MONOCHROME.black,
		width: 'fit-content',
		cursor: 'pointer'
	}),
	indicatorSeparator: () => ({
		display: 'none'
	}),
	dropdownIndicator: provided => ({
		...provided,
		color: MONOCHROME.black,
		padding: 0
	}),
	singleValue: provided => ({
		...provided,
		fontWeight: 300,
		color: MONOCHROME.black
	}),
	option: (provided, state) => ({
		...provided,
		color: MONOCHROME.black,
		backgroundColor: state.isSelected ? MONOCHROME.gray : MONOCHROME.white,
		padding: '8px 12px',
		cursor: 'pointer',
		':hover': {
			backgroundColor: MONOCHROME.darkGray,
			color: MONOCHROME.black
		}
	}),
	menu: provided => ({
		...provided,
		boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
		borderRadius: '4px',
		position: 'absolute',
		zIndex: 100
	})
}
