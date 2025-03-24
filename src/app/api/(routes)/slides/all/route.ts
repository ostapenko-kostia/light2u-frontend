import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url)
		const locale = searchParams.get('locale')

		const whereCondition = locale ? { locale } : {}

		const slides = await prisma.slide.findMany({
			where: whereCondition
		})
		return NextResponse.json(slides, { status: 200 })
	} catch (error) {
		return handleApiError(error)
	}
}
