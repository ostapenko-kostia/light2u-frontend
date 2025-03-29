import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { saveFile } from '@/app/api/utils/saveFile'
import { prisma } from '@/prisma/prisma-client'
import slugify from '@sindresorhus/slugify'
import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'

const catSchema = Joi.object({
	name: Joi.object({
		ru: Joi.string().min(1).required().messages({
			'string.empty': "Назва категорії російською обов'язкова до заповнення",
			'any.required': "Назва категорії російською обов'язкова до заповнення"
		}),
		uk: Joi.string().min(1).required().messages({
			'string.empty': "Назва категорії українською обов'язкова до заповнення",
			'any.required': "Назва категорії українською обов'язкова до заповнення"
		})
	}),
	parentCategorySlug: Joi.string().min(1).required().messages({
		'string.empty': 'Вкажіть батьківську категорію',
		'string.min': 'Вкажіть батьківську категорію',
		'any.required': 'Вкажіть батьківську категорію'
	})
})

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const name = JSON.parse(formData.get('name') as string)
		const parentCategorySlug = formData.get('parentCategorySlug') as string
		const image = formData.get('image') as File

		const { error, value } = catSchema.validate(
			{
				name,
				parentCategorySlug
			},
			{ abortEarly: false }
		)

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		value.slug = slugify(name.uk)
		const existingCategory = await prisma.secondLevelCategory.findUnique({
			where: { slug: value.slug }
		})

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

		const cat = await prisma.secondLevelCategory.create({
			data: {
				slug: value.slug,
				name: name,
				image: savedImage,
				parentCategorySlug: value.parentCategorySlug
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
