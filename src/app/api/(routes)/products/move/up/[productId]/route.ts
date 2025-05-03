import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../../../admin/auth/utils/checkIsAdmin'

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ productId: string }> }
) {
	try {
		const { productId } = await params

		const isAdmin = await checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		// Get the current product
		const currentProduct = await prisma.product.findUnique({
			where: { id: Number(productId) }
		})

		if (!currentProduct) {
			throw new ApiError('Product not found', 404)
		}

		// Find the product with the next higher order in the same category
		const nextProduct = await prisma.product.findFirst({
			where: {
				order: {
					gt: currentProduct.order
				},
				categorySlug: currentProduct.categorySlug
			},
			orderBy: {
				order: 'asc'
			}
		})

		console.log(nextProduct)

		if (nextProduct) {
			// Swap orders
			await prisma.$transaction([
				prisma.product.update({
					where: { id: currentProduct.id },
					data: { order: nextProduct.order }
				}),
				prisma.product.update({
					where: { id: nextProduct.id },
					data: { order: currentProduct.order }
				})
			])
		}

		return NextResponse.json(
			{ ok: true },
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		)
	} catch (error) {
		return handleApiError(error)
	}
}
