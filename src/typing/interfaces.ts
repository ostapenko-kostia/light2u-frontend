import { LOCALE } from './enums'

export interface IAdmin {
	login: string
	id: number
}

export interface IProduct {
	id: number
	slug: string
	name: string
	description: string
	images: string[]
	price: number
	locale: LOCALE
	quantity: number
	order: number
	info: IProductInfo[]
	categorySlug: string
	createdAt: Date
	updatedAt: Date
}

export interface IProductInfo {
	id: number
	key: string
	value: string
	order: number
	productId: number
	createdAt: Date
	updatedAt: Date
}

export interface IFirstLevelCategory {
	id: string
	slug: string
	image: string
	name: { uk: string; ru: string }
	createdAt: Date
	updatedAt: Date
}

export interface ISecondLevelCategory {
	id: string
	slug: string
	image: string
	name: { uk: string; ru: string }
	parentCategorySlug: string
	createdAt: Date
	updatedAt: Date
}

export interface ITextField {
	id: number
	slug: string
	locale: LOCALE
	text: string
	createdAt: Date
	updatedAt: Date
}

export interface ISlide {
	id: number
	background: string
	text: string
	description: string
	url: string
	locale: LOCALE
	createdAt: Date
	updatedAt: Date
}

export interface IObject {
	id: number
	slug: string
	locale: LOCALE
	name: string
	description: string
	city: string
	address: string
	images: string[]
	createdAt: Date
	updatedAt: Date
}

export interface IFile {
	title: string
	createdAt: string
	url: string
}

export interface ICatalogSearchParams {
	search?: string
	firstLevelCategory?: string
	secondLevelCategory?: string
}

export interface ICatalogData {
	firstLevelCategories: any[] | undefined
	secondLevelCategories: any[] | undefined
	products: any[] | undefined
}
