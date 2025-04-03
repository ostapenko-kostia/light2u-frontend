import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import slugify from '@sindresorhus/slugify'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../../admin/auth/utils/checkIsAdmin'

async function generateUniqueSlug(baseSlug: string, locale: string) {
	let slug = baseSlug
	let counter = 1
	let exists = true

	while (exists) {
		const product = await prisma.product.findFirst({
			where: {
				slug,
				locale
			}
		})

		if (!product) {
			exists = false
		} else {
			slug = `${baseSlug}-${counter}`
			counter++
		}
	}

	return slug
}

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ productId: string }> }
) {
	try {
		const { productId } = await params
		const isAdmin = await checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		const product = await prisma.product.findUnique({
			where: { id: Number(productId) },
			include: { info: true }
		})

		if (!product) throw new ApiError('Product not found', 404)

		const newSlug = await generateUniqueSlug(`${slugify(product.name)}-copy`, product.locale)

		const duplicatedProduct = await prisma.product.create({
			data: {
				name: `${product.name} (copy)`,
				slug: newSlug,
				price: product.price,
				description: product.description,
				categorySlug: product.categorySlug,
				locale: product.locale,
				images: product.images,
				info: {
					create: product.info.map(info => ({
						key: info.key,
						value: info.value,
						order: info.order
					}))
				}
			}
		})

		return NextResponse.json({ ok: true, product: duplicatedProduct }, { status: 200 })
	} catch (error) {
		return handleApiError(error)
	}
}
