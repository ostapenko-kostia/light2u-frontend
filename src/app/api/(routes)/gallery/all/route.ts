import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const gallery = await prisma.gallery.findMany()
		return NextResponse.json(gallery, { status: 200 })
	} catch (error) {
		return handleApiError(error)
	}
}
