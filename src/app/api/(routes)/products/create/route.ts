import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { saveFile } from '@/app/api/utils/saveFile'
import { prisma } from '@/prisma/prisma-client'
import slugify from '@sindresorhus/slugify'
import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'

const productSchema = Joi.object({
	name: Joi.string().min(1).required().messages({
		'string.empty': 'Name is required',
		'any.required': 'Name is required'
	}),
	price: Joi.number().integer().positive().required().messages({
		'number.base': 'Price must be a number',
		'number.integer': 'Price must be an integer',
		'number.positive': 'Price must be greater than zero',
		'any.required': 'Price is required'
	}),
	description: Joi.string().min(1).required().messages({
		'string.empty': 'Description is required',
		'any.required': 'Description is required'
	}),
	categorySlug: Joi.string().min(1).required().messages({
		'string.empty': 'Category slug is required',
		'any.required': 'Category slug is required'
	}),
	materials: Joi.string().required().messages({
		'string.empty': 'Materials are required',
		'any.required': 'Materials are required'
	}),
	dimensions: Joi.string().required().messages({
		'string.empty': 'Dimensions are required',
		'any.required': 'Dimensions are required'
	}),
	weight: Joi.string().required().messages({
		'string.empty': 'Weight is required',
		'any.required': 'Weight is required'
	}),
	power: Joi.string().required().messages({
		'string.empty': 'Power is required',
		'any.required': 'Power is required'
	}),
	voltage: Joi.number().integer().positive().required().messages({
		'number.base': 'Voltage must be a number',
		'number.integer': 'Voltage must be an integer',
		'number.positive': 'Voltage must be greater than zero',
		'any.required': 'Voltage is required'
	}),
	bulb: Joi.string().required().messages({
		'string.empty': 'Bulb information is required',
		'any.required': 'Bulb information is required'
	}),
	bulbColor: Joi.string().required().messages({
		'string.empty': 'Bulb color is required',
		'any.required': 'Bulb color is required'
	}),
	bulbType: Joi.string().required().messages({
		'string.empty': 'Bulb type is required',
		'any.required': 'Bulb type is required'
	})
})

async function generateUniqueSlug(slug: string): Promise<string> {
	let uniqueSlug = slug
	let counter = 1

	while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
		uniqueSlug = `${slug}-${counter}`
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

		value.slug = await generateUniqueSlug(value.slug)

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

		const product = await prisma.product.create({
			data: {
				name: value.name,
				slug: value.slug,
				price: value.price,
				description: value.description,
				categorySlug: value.categorySlug,
				materials: value.materials,
				dimensions: value.dimensions,
				weight: value.weight,
				power: value.power,
				voltage: value.voltage,
				bulb: value.bulb,
				bulbColor: value.bulbColor,
				bulbType: value.bulbType,
				images: savedImages
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
