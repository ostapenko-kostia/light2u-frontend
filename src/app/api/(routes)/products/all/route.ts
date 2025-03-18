import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const products = await prisma.product.findMany()
		return NextResponse.json(products, { status: 200 })
	} catch (error) {
		return handleApiError(error)
	}
}
