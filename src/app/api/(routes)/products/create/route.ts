import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { saveFile } from '@/app/api/utils/saveFile'
import { prisma } from '@/prisma/prisma-client'
import slugify from '@sindresorhus/slugify'
import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'

const productSchema = Joi.object({
	name: Joi.string().required().messages({
		'string.empty': "Назва обов'язкова до заповнення",
		'any.required': "Назва обов'язкова до заповнення"
	}),
	price: Joi.number().integer().positive().required().messages({
		'number.base': 'Ціна має бути числом',
		'number.integer': 'Ціна має бути цілим числом',
		'number.positive': 'Ціна має бути додатнім числом',
		'any.required': "Ціна обов'язкова до заповнення"
	}),
	description: Joi.string().required().messages({
		'string.empty': "Опис обов'язковий до заповнення",
		'any.required': "Опис обов'язковий до заповнення"
	}),
	categorySlug: Joi.string().required().messages({
		'string.empty': "Категорія обов'язкова до заповнення",
		'any.required': "Категорія обов'язкова до заповнення"
	}),
	productInfo: Joi.array()
		.items(
			Joi.object({
				key: Joi.string().min(1).required().messages({
					'string.empty': "Ключ обов'язковий до заповнення",
					'any.required': "Ключ обов'язковий до заповнення"
				}),
				value: Joi.string().min(1).required().messages({
					'string.empty': "Значення обов'язкове до заповнення",
					'any.required': "Значення обов'язкове до заповнення"
				}),
				order: Joi.number().integer().min(0).required().messages({
					'number.base': 'Порядок має бути числом',
					'number.integer': 'Порядок має бути цілим числом',
					'number.min': "Порядок не може бути від'ємним",
					'any.required': "Порядок обов'язковий"
				})
			})
		)
		.optional(),
	locale: Joi.string().valid('uk', 'ru').default('uk').messages({
		'string.empty': 'Locale is required',
		'any.only': 'Locale must be either "uk" or "ru"'
	}),
	quantity: Joi.number().integer().min(0).required().messages({
		'number.base': 'Кількість має бути числом',
		'number.integer': 'Кількість має бути цілим числом',
		'number.min': "Кількість не може бути від'ємною",
		'any.required': "Кількість обов'язкова"
	}),
})

async function generateUniqueSlug(slug: string, locale: string = 'uk'): Promise<string> {
	// Add locale to the slug to ensure it's unique across locales
	const slugWithLocale = `${slug}-${locale}`
	let uniqueSlug = slugWithLocale
	let counter = 1

	while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
		uniqueSlug = `${slugWithLocale}-${counter}`
		counter++
	}

	return uniqueSlug
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const body = Object.fromEntries(formData)

		const productInfo = JSON.parse(body.productInfo as string)
		const images = formData.getAll('images') as File[]

		const { error, value } = productSchema.validate(productInfo, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		value.slug = slugify(value.name)

		value.slug = await generateUniqueSlug(value.slug, value.locale)

		const isAdmin = await checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		const savedImages: string[] = []

		for (const file of images) {
			if (file && file.type?.startsWith('image/')) {
				const savedPath = await saveFile(file, req)
				savedImages.push(savedPath)
			} else {
				throw new ApiError('Each image must be of type image/*', 400)
			}
		}

		const info = productInfo.productInfo

		const product = await prisma.product.create({
			data: {
				name: value.name,
				slug: value.slug,
				price: value.price,
				description: value.description,
				categorySlug: value.categorySlug,
				locale: value.locale || 'uk',
				images: savedImages,
				quantity: value.quantity,
				info:
					info?.length > 0
						? {
								create: info?.map((info: any) => ({
									key: info.key,
									value: info.value
								}))
						  }
						: undefined
			}
		})

		return NextResponse.json(
			{ ok: true, product },
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	} catch (error) {
		return handleApiError(error)
	}
}
