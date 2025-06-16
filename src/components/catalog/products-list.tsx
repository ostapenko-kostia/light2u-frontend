import { ProductCard } from '@/components/layout/product-card'
import { AnimatedSection } from './animated-section'

interface ProductsListProps {
	products: any[] | undefined
	t: any
}

export const ProductsList = ({ products, t }: ProductsListProps) => (
	<AnimatedSection>
		{products?.length ? (
			products
				.sort((a, b) => b.order - a.order)
				.map(product => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))
		) : (
			<p className='text-gray-500'>{t('catalog-no-products')}</p>
		)}
	</AnimatedSection>
)
