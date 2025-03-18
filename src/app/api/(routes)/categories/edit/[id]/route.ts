import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { ApiError } from '@/app/api/exceptions/apiError'
import slugify from '@sindresorhus/slugify'
import { checkIsAdmin } from '../../../admin/auth/utils/checkIsAdmin'
import { saveFile } from '@/app/api/utils/saveFile'
import { deleteFile } from '@/app/api/utils/deleteFile'

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

		value.slug = slugify(name.ua)

		const isAdmin = await checkIsAdmin(req)

		if (!isAdmin) throw new ApiError('You are not admin', 403)

		let savedImage: string

		const oldCategory = await prisma.category.findUnique({ where: { id } })

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

		const cat = await prisma.category.update({
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
