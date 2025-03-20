import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { saveFileWithName } from '@/app/api/utils/saveFileWithName'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'

export async function POST(req: NextRequest) {
	try {
		const isAdmin = await checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		const formData = await req.formData()
		const body = Object.fromEntries(formData)

		const name = JSON.parse(body.name as string)
		const file = formData.get('file') as File

		if (!name || name.length <= 0) throw new ApiError('Name is required', 400)

		await saveFileWithName({ file, name }, req)

		return NextResponse.json({ ok: true }, { status: 200 })
	} catch (error) {
		return handleApiError(error)
	}
}
