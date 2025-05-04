import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { api } from '@/lib/axios'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../../admin/auth/utils/checkIsAdmin'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = parseInt((await params).id, 10)
		if (isNaN(id)) throw new ApiError('Invalid ID parameter', 400)

		const isAdmin = await checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		const gallery = await prisma.gallery.findUnique({ where: { id } })
		if (!gallery) throw new ApiError('Gallery image not found', 404)

		if (gallery.image) {
			try {
				await api.delete(gallery.image)
			} catch (error) {
				console.warn(`Failed to delete file: ${gallery.image}`, error)
			}
		}

		await prisma.gallery.delete({ where: { id } })

		return NextResponse.json({ ok: true }, { status: 200 })
	} catch (error) {
		return handleApiError(error)
	}
}
