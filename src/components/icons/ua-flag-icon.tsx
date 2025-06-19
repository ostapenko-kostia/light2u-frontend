export function UaFlagIcon({ width = 30, height = 20 }: { width?: number; height?: number }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
		>
			<rect
				width='100%'
				height='100%'
				fill='#FFD700'
			/>
			<rect
				width='100%'
				height='50%'
				fill='#0057B7'
			/>
		</svg>
	)
}
