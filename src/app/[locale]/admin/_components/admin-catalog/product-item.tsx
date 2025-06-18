import { ProductItemProps } from './types'

export function ProductItem({ product, selectedItem, onSelect }: ProductItemProps) {
	return (
		<button
			key={product.id}
			className={`w-full px-3 py-1 text-left ${
				selectedItem === product ? 'bg-blue-100' : 'hover:bg-gray-200'
			}`}
			onClick={() => onSelect(product)}
		>
			{product.name}
		</button>
	)
}
