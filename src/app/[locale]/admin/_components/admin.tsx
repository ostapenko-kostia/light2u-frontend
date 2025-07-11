'use client'

import { useGetAdmins } from '@/hooks/useAdmin'
import { useGetFirstLevelCategories, useGetSecondLevelCategories } from '@/hooks/useCategories'
import { useGetProducts } from '@/hooks/useProducts'
import { useGetSlides } from '@/hooks/useSlides'
import { useGetFiles } from '@/hooks/useStorage'
import { useGetTexts } from '@/hooks/useText'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { AdminSlidesTab } from './admin-slides/admin-slides'
import { AdminStorageControlTab } from './admin-storage/admin-storage-control-tab'
import { AdminTextFieldsTab } from './admin-texts/admin-texts'
import { AdminsTab } from './admins-tab/admins-tab'
import { AdminCatalogTab } from './admin-catalog/admin-catalog'
import clsx from 'clsx'
import { Dialog } from '@/components/ui/dialog'
import { MenuIcon } from 'lucide-react'
import { AdminObjectsTab } from './admin-objects/admin-objects'
import { useGetObjects } from '@/hooks/useObjects'

const Navigation = ({
	className,
	activeTab,
	setActiveTab
}: {
	className?: string
	activeTab: string
	setActiveTab: (tab: string) => void
}) => {
	const [isCatalogOpen, setIsCatalogOpen] = useState(false)

	return (
		<nav className={clsx('gap-4 flex space-x-1', className)}>
			<button
				onClick={() => {
					setActiveTab('dashboard')
					setIsCatalogOpen(false)
				}}
				className={`px-4 py-2 rounded-md ${
					activeTab === 'dashboard' ? 'bg-white text-blue-900' : 'hover:bg-blue-700'
				}`}
			>
				Головна
			</button>

			<div className='relative'>
				<button
					onClick={() => {
						setIsCatalogOpen(!isCatalogOpen)
						if (!isCatalogOpen) setActiveTab('catalog')
					}}
					className={`px-4 py-2 rounded-md flex items-center ${
						activeTab === 'catalog' ? 'bg-white text-blue-900' : 'hover:bg-blue-700'
					}`}
				>
					Каталог
				</button>
			</div>

			<button
				onClick={() => {
					setActiveTab('admins')
					setIsCatalogOpen(false)
				}}
				className={`px-4 py-2 rounded-md ${
					activeTab === 'admins' ? 'bg-white text-blue-900' : 'hover:bg-blue-700'
				}`}
			>
				Адміністратори
			</button>

			<button
				onClick={() => {
					setActiveTab('slides')
					setIsCatalogOpen(false)
				}}
				className={`px-4 py-2 rounded-md ${
					activeTab === 'slides' ? 'bg-white text-blue-900' : 'hover:bg-blue-700'
				}`}
			>
				Слайди
			</button>

			<button
				onClick={() => {
					setActiveTab('objects')
					setIsCatalogOpen(false)
				}}
				className={`px-4 py-2 rounded-md ${
					activeTab === 'objects' ? 'bg-white text-blue-900' : 'hover:bg-blue-700'
				}`}
			>
				Об'єкти
			</button>

			<button
				onClick={() => {
					setActiveTab('texts')
					setIsCatalogOpen(false)
				}}
				className={`px-4 py-2 rounded-md ${
					activeTab === 'texts' ? 'bg-white text-blue-900' : 'hover:bg-blue-700'
				}`}
			>
				Текстові поля
			</button>

			<button
				onClick={() => {
					setActiveTab('storage')
					setIsCatalogOpen(false)
				}}
				className={`px-4 py-2 rounded-md ${
					activeTab === 'storage' ? 'bg-white text-blue-900' : 'hover:bg-blue-700'
				}`}
			>
				Сховище
			</button>
		</nav>
	)
}

function AdminComponent() {
	const { data: products } = useGetProducts()
	const { data: firstLevelCategories } = useGetFirstLevelCategories()
	const { data: secondLevelCategories } = useGetSecondLevelCategories()
	const { data: texts } = useGetTexts()
	const { data: admins } = useGetAdmins()
	const { data: files } = useGetFiles()
	const { data: slides } = useGetSlides()
	const { data: objects } = useGetObjects()

	const [activeTab, setActiveTab] = useState('catalog')

	// Content area based on active tab
	const renderContent = () => {
		switch (activeTab) {
			case 'catalog':
				return (
					<AdminCatalogTab
						products={products || []}
						firstLevelCategories={firstLevelCategories || []}
						secondLevelCategories={secondLevelCategories || []}
					/>
				)
			case 'admins':
				return <AdminsTab admins={admins || []} />
			case 'slides':
				return <AdminSlidesTab slides={slides || []} />
			case 'texts':
				return <AdminTextFieldsTab texts={texts || []} />
			case 'storage':
				return <AdminStorageControlTab files={files || []} />
			case 'objects':
				return <AdminObjectsTab objects={objects || []} />
			default:
				return (
					<div className='p-8 text-center'>
						<h2 className='text-2xl font-bold mb-6'>Вітаємо в адміністративній панелі</h2>
						<p className='text-gray-600'>Виберіть розділ для управління контентом</p>
					</div>
				)
		}
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-lg'>
				<div className='container mx-auto px-4'>
					<div className='flex justify-between items-center h-16'>
						<div className='flex items-center'>
							<h1 className='text-xl font-bold'>Адмін Панель</h1>
						</div>
						<Navigation
							className='max-xl:hidden'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
						<Dialog
							title='Адміністративне меню'
							trigger={
								<button className='xl:hidden'>
									<MenuIcon />
								</button>
							}
						>
							<Navigation
								className='flex-col items-center'
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>
						</Dialog>
					</div>
				</div>
			</div>

			{/* Main Content Area */}
			<div className='container mx-auto px-4 py-8 max-sm:p-2'>
				<div className='bg-white rounded-lg shadow-md p-6 max-sm:p-2 animate-fadeIn'>{renderContent()}</div>
			</div>
		</div>
	)
}

export const Admin = dynamic(() => Promise.resolve(AdminComponent), { ssr: false })
