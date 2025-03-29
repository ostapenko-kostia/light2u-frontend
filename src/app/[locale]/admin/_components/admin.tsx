'use client'

import { useGetAdmins } from '@/hooks/useAdmin'
import { useGetFirstLevelCategories, useGetSecondLevelCategories } from '@/hooks/useCategories'
import { useGetGallery } from '@/hooks/useGallery'
import { useGetProducts } from '@/hooks/useProducts'
import { useGetSlides } from '@/hooks/useSlides'
import { useGetFiles } from '@/hooks/useStorage'
import { useGetTexts } from '@/hooks/useText'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { AdminCategoriesTab } from './admin-categories/admin-categories'
import { AdminGalleryTab } from './admin-gallery/admin-gallery'
import { AdminProductsTab } from './admin-products/admin-products'
import { AdminSlidesTab } from './admin-slides/admin-slides'
import { AdminStorageControlTab } from './admin-storage/admin-storage-control-tab'
import { AdminTextFieldsTab } from './admin-texts/admin-texts'
import { AdminsTab } from './admins-tab/admins-tab'

function AdminComponent() {
	const { data: products } = useGetProducts()
	const { data: firstLevelCategories } = useGetFirstLevelCategories()
	const { data: secondLevelCategories } = useGetSecondLevelCategories()
	const { data: texts } = useGetTexts()
	const { data: admins } = useGetAdmins()
	const { data: files } = useGetFiles()
	const { data: slides } = useGetSlides()
	const { data: galleries } = useGetGallery()

	const [currentTab, setCurrentTab] = useState(0)

	const tabs = [
		<AdminProductsTab
			products={products}
			firstLevelCategories={firstLevelCategories}
			secondLevelCategories={secondLevelCategories}
		/>,
		<AdminCategoriesTab
			firstLevelCategories={firstLevelCategories}
			secondLevelCategories={secondLevelCategories}
			products={products}
		/>,
		<AdminSlidesTab slides={slides} />,
		<AdminGalleryTab galleries={galleries} />,
		<AdminsTab admins={admins} />,
		<AdminTextFieldsTab texts={texts} />,
		<AdminStorageControlTab files={files} />
	]

	return (
		<div className='min-h-[80vh] container mx-auto max-sm:px-2 py-8 grid grid-cols-[1fr_2.5fr] max-lg:grid-cols-1 gap-5 animate-opacity-1'>
			<div className='bg-white rounded-md shadow-sm p-4'>
				<h2 className='text-3xl text-center my-5 font-semibold'>Адмін панель</h2>
				<ul className='flex flex-col gap-5 py-5 px-6 h-full w-full'>
					<li
						onClick={() => setCurrentTab(0)}
						className={`text-xl max-sm:text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
							currentTab === 0 ? 'text-blue-500' : ''
						}`}
					>
						Товари
					</li>
					<li
						onClick={() => setCurrentTab(1)}
						className={`text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
							currentTab === 1 ? 'text-blue-500' : ''
						}`}
					>
						Категорії
					</li>
					<li
						onClick={() => setCurrentTab(2)}
						className={`text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
							currentTab === 2 ? 'text-blue-500' : ''
						}`}
					>
						Слайди
					</li>
					<li
						onClick={() => setCurrentTab(3)}
						className={`text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
							currentTab === 3 ? 'text-blue-500' : ''
						}`}
					>
						Галерея
					</li>
					<li
						onClick={() => setCurrentTab(4)}
						className={`text-xl max-sm:text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
							currentTab === 4 ? 'text-blue-500' : ''
						}`}
					>
						Адміністратори
					</li>
					<li
						onClick={() => setCurrentTab(5)}
						className={`text-xl max-sm:text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
							currentTab === 5 ? 'text-blue-500' : ''
						}`}
					>
						Текстові поля
					</li>
					<li
						onClick={() => setCurrentTab(6)}
						className={`text-xl max-sm:text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
							currentTab === 6 ? 'text-blue-500' : ''
						}`}
					>
						Сховище
					</li>
				</ul>
			</div>
			<div className='bg-white rounded-md shadow-sm w-full'>{tabs[currentTab]}</div>
		</div>
	)
}

export const Admin = dynamic(() => Promise.resolve(AdminComponent), { ssr: false })
