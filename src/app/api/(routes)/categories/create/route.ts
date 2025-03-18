import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import slugify from '@sindresorhus/slugify'
import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'
import { saveFile } from '@/app/api/utils/saveFile'

const catSchema = Joi.object({
	ru: Joi.string().min(1).required().messages({
		'string.empty': 'Russian name is required',
		'any.required': 'Russian name is required'
	}),
	ua: Joi.string().min(1).required().messages({
		'string.empty': 'Ukrainian name is required',
		'any.required': 'Ukrainian name is required'
	})
})

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const body = Object.fromEntries(formData)

		const name = JSON.parse(body.name as string)
		const image = formData.get('image') as File

		const { error, value } = catSchema.validate(name, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		value.slug = slugify(name.ua)
		const existingCategory = await prisma.category.findUnique({ where: { slug: value.slug } })

		if (existingCategory) {
			throw new ApiError(`Така категорія вже існує`, 400)
		}

		const isAdmin = await checkIsAdmin(req)

		if (!isAdmin) throw new ApiError('You are not admin', 403)

		let savedImage: string

		if (image && image.type?.startsWith('image/')) {
			const savedPath = await saveFile(image, req)
			savedImage = savedPath
		} else {
			throw new ApiError('Each image must be of type image/*', 400)
		}

		const cat = await prisma.category.create({
			data: {
				slug: value.slug,
				name,
				image: savedImage
			}
		})

		return NextResponse.json(
			{ ok: true, category: cat },
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
