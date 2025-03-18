import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { ApiError } from '@/app/api/exceptions/apiError'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'
import { saveFile } from '@/app/api/utils/saveFile'

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const image = formData.get('image') as File

		let savedImage: string = ''

		if (image && image.type?.startsWith('image/')) {
			const savedPath = await saveFile(image, req)
			savedImage = savedPath
		} else {
			throw new ApiError('Each image must be of type image/*', 400)
		}

		const isAdmin = await checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		const gallery = await prisma.gallery.create({ data: { image: savedImage } })

		return NextResponse.json(gallery, {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (error) {
		return handleApiError(error)
	}
}
