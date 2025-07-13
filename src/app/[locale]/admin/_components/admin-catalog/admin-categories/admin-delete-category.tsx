'use client'

import { Dialog } from '@/components/ui/dialog'
import { useDeleteFirstLevelCategory, useDeleteSecondLevelCategory } from '@/hooks/useCategories'
import { IFirstLevelCategory, IProduct, ISecondLevelCategory } from '@/typing/interfaces'
import { Loader2, Trash2Icon } from 'lucide-react'

interface Props {
	category: IFirstLevelCategory | ISecondLevelCategory
	products: IProduct[] | undefined
	secondLevelCategories?: ISecondLevelCategory[]
}

export function AdminDeleteCategory({ category, products, secondLevelCategories }: Props) {
	const { mutateAsync: deleteFirstLevelFunc, isPending: isFirstPending } =
		useDeleteFirstLevelCategory()
	const { mutateAsync: deleteSecondLevelFunc, isPending: isSecondPending } =
		useDeleteSecondLevelCategory()

	const handleDelete = async () => {
		if ('parentCategorySlug' in category) {
			await deleteSecondLevelFunc(Number(category.id))
		} else {
			await deleteFirstLevelFunc(Number(category.id))
		}
	}

	const isDisabled = () => {
		if ('parentCategorySlug' in category) {
			return !!products?.find(p => p.categorySlug === category.slug)
		} else if (isFirstPending || isSecondPending) {
			return true
		} else {
			return (
				!!products?.find(p => p.categorySlug === category.slug) ||
				!!secondLevelCategories?.some(cat => cat.parentCategorySlug === category.slug)
			)
		}
	}

	const getDisabledTitle = () => {
		if ('parentCategorySlug' in category) {
			return 'Дана категорія використовується в товарах'
		} else {
			if (!!secondLevelCategories?.some(cat => cat.parentCategorySlug === category.slug)) {
				return 'Неможливо видалити категорію з підкатегоріями'
			}
			return 'Дана категорія використовується в товарах'
		}
	}

	return (
		<Dialog
			title='Видалити категорію'
			trigger={
				<button
					disabled={isDisabled()}
					title={isDisabled() ? getDisabledTitle() : 'Видалити'}
					className='ml-4 text-red-600 hover:text-red-900 disabled:text-red-200 disabled:cursor-not-allowed'
				>
					<Trash2Icon />
				</button>
			}
		>
			<div className='flex flex-col items-start gap-6 w-full'>
				<p>Ви дійсно хочете видалити категорію {(category.name as { uk: string }).uk}?</p>
				<button
					disabled={isDisabled()}
					className='bg-gray-800 text-white self-end rounded-md px-6 py-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
					onClick={async () => {
						try {
							await handleDelete()
						} catch {}
					}}
				>
					{isFirstPending || isSecondPending ? <Loader2 className='animate-spin' /> : 'Так'}
				</button>
			</div>
		</Dialog>
	)
}
