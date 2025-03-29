import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { deleteFile } from '@/app/api/utils/deleteFile'
import { saveFile } from '@/app/api/utils/saveFile'
import { prisma } from '@/prisma/prisma-client'
import slugify from '@sindresorhus/slugify'
import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../../admin/auth/utils/checkIsAdmin'

const catSchema = Joi.object({
	ru: Joi.string().min(1).required().messages({
		'string.empty': 'Russian name is required',
		'any.required': 'Russian name is required'
	}),
	uk: Joi.string().min(1).required().messages({
		'string.empty': "Назва категорії українською обов'язкова до заповнення",
		'string.min': 'Назва категорії українською повинна містити принаймні 1 символ'
	})
})

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = Number((await params).id)
		const formData = await req.formData()
		const body = Object.fromEntries(formData)

		const name = JSON.parse(body.name as string)
		const image = formData.get('image') as File

		const { error, value } = catSchema.validate(name, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		value.slug = slugify(name.uk)

		const isAdmin = await checkIsAdmin(req)

		if (!isAdmin) throw new ApiError('You are not admin', 403)

		let savedImage: string

		const oldCategory = await prisma.firstLevelCategory.findUnique({ where: { id } })

		if (image) {
			console.log(oldCategory?.image)
			if (oldCategory?.image) await deleteFile(oldCategory.image, req)

			if (image && image.type?.startsWith('image/')) {
				const savedPath = await saveFile(image, req)
				savedImage = savedPath
			} else {
				throw new ApiError('Each image must be of type image/*', 400)
			}
		} else {
			savedImage = oldCategory?.image ?? ''
		}

		const cat = await prisma.firstLevelCategory.update({
			where: { id },
			data: { image: savedImage, name }
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
