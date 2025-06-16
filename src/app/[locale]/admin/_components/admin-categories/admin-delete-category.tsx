'use client'

import { Dialog, DialogContext } from '@/components/ui/dialog'
import { useDeleteFirstLevelCategory, useDeleteSecondLevelCategory } from '@/hooks/useCategories'
import { IFirstLevelCategory, IProduct, ISecondLevelCategory } from '@/typing/interfaces'
import { useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
	category: IFirstLevelCategory | ISecondLevelCategory
	products: IProduct[] | undefined
	secondLevelCategories?: ISecondLevelCategory[]
}

export function AdminDeleteCategory({ category, products, secondLevelCategories }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const queryClient = useQueryClient()
	const {
		mutateAsync: deleteFirstLevelFunc,
		isPending: isFirstLevelPending,
		isSuccess: isFirstLevelSuccess,
		isError: isFirstLevelError
	} = useDeleteFirstLevelCategory()
	const {
		mutateAsync: deleteSecondLevelFunc,
		isPending: isSecondLevelPending,
		isSuccess: isSecondLevelSuccess,
		isError: isSecondLevelError
	} = useDeleteSecondLevelCategory()
	const dialogContextValues = useContext(DialogContext)
	const closeDialog = dialogContextValues?.closeDialog

	const isPending = isFirstLevelPending || isSecondLevelPending
	const isSuccess = isFirstLevelSuccess || isSecondLevelSuccess
	const isError = isFirstLevelError || isSecondLevelError

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває видалення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['categories get'] })
			toast.success('Категорію успішно видалено!')
			closeDialog?.()
		}
		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			closeDialog?.()
		}
	}, [isPending, isSuccess, isError])

	const handleDelete = async () => {
		if ('parentCategorySlug' in category) {
			// This is a second level category
			await deleteSecondLevelFunc(Number(category.id))
		} else {
			// This is a first level category
			await deleteFirstLevelFunc(Number(category.id))
		}
	}

	const isDisabled = () => {
		if ('parentCategorySlug' in category) {
			// Second level category
			return !!products?.find(p => p.categorySlug === category.slug)
		} else {
			// First level category
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
					Видалити
				</button>
			}
		>
			<div className='flex flex-col items-start gap-6 w-full'>
				<p>Ви дійсно хочете видалити категорію {(category.name as { uk: string }).uk}?</p>
				<button
					className='bg-gray-800 text-white self-end rounded-md px-6 py-2 hover:bg-gray-700'
					onClick={handleDelete}
				>
					Так
				</button>
			</div>
		</Dialog>
	)
}
