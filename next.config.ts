import type { NextConfig } from 'next'
import withNextIntl from 'next-intl/plugin'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ hostname: 'localhost' },
			{ hostname: 'storage.light2u.com.ua' },
			{ hostname: 'light2u-bucket.s3.amazonaws.com' }
		]
	}
}

export default withNextIntl('./src/lib/i18n.ts')(nextConfig)
