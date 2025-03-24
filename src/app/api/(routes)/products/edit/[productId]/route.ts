import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { deleteFile } from '@/app/api/utils/deleteFile'
import { saveFile } from '@/app/api/utils/saveFile'
import { prisma } from '@/prisma/prisma-client'
import slugify from '@sindresorhus/slugify'
import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../../admin/auth/utils/checkIsAdmin'

const productSchema = Joi.object({
	name: Joi.string().optional(),
	price: Joi.number().integer().positive().optional(),
	description: Joi.string().optional(),
	categorySlug: Joi.string().optional(),
	materials: Joi.string().optional(),
	dimensions: Joi.string().optional(),
	weight: Joi.string().optional(),
	power: Joi.string().optional(),
	voltage: Joi.number().integer().positive().optional(),
	bulb: Joi.string().optional(),
	bulbColor: Joi.string().optional(),
	bulbType: Joi.string().optional(),
	locale: Joi.string().valid('uk', 'ru').default('uk').messages({
		'string.empty': 'Locale is required',
		'any.only': 'Locale must be either "uk" or "ru"'
	})
})

async function generateUniqueSlug(slug: string, locale: string): Promise<string> {
	const slugWithLocale = `${slug}-${locale}`
	let uniqueSlug = slugWithLocale
	let counter = 1
	while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
		uniqueSlug = `${slugWithLocale}-${counter}`
		counter++
	}
	return uniqueSlug
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ productId: string }> }
) {
	try {
		const { productId } = await params
		const formData = await req.formData()
		const body = Object.fromEntries(formData)
		const productInfo = JSON.parse(body.productInfo as string)
		const newImages = formData.getAll('images') as File[]

		const isAdmin = await checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		const { error, value } = productSchema.validate(productInfo, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		if (value.name) {
			value.slug = slugify(value.name)
			value.slug = await generateUniqueSlug(value.slug, value.locale)
		}

		if (newImages.length) {
			const product = await prisma.product.findUnique({
				where: { id: Number(productId) }
			})

			if (product?.images && Array.isArray(product.images)) {
				for (const image of product.images) {
					if (image) {
						try {
							await deleteFile(image, req)
						} catch (error) {
							console.warn(`Failed to delete file: ${image}`, error)
						}
					}
				}
			}

			const savedImages: string[] = []
			for (const file of newImages) {
				if (file && file.type?.startsWith('image/')) {
					const savedPath = await saveFile(file, req)
					savedImages.push(savedPath)
				} else {
					throw new ApiError('Each image must be of type image/*', 400)
				}
			}

			value.images = savedImages
		}

		const { info: _, ...valueWithoutInfo } = value

		if (valueWithoutInfo) {
			await prisma.product.update({
				where: { id: Number(productId) },
				data: valueWithoutInfo
			})
		}

		return NextResponse.json(
			{ ok: true },
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		)
	} catch (error) {
		return handleApiError(error)
	}
}
