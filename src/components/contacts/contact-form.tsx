'use client'

import { useContactUs } from '@/hooks/useEmail'
import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { Loader2, LoaderIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

export function ContactForm() {
	const { t } = useTranslation()
	const { mutate: contactUs, isPending } = useContactUs()
	const { handleSubmit, register } = useForm<{ name: string; email: string; message: string }>()

	return (
		<motion.div
			initial={{ opacity: 0, x: -30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.7 }}
			id='form'
		>
			<h2 className='text-2xl font-bold mb-6 border-b-2 border-amber-400 inline-block pb-2'>
				{t('contacts-form-title')}
			</h2>

			<form
				className='space-y-5'
				onSubmit={handleSubmit(data => {
					contactUs({
						name: data.name,
						email: data.email,
						message: data.message
					})
				})}
			>
				<div>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						{t('contacts-form-name')}
					</label>
					<input
						type='text'
						id='name'
						className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400'
						placeholder={t('contacts-form-name-placeholder')}
						{...register('name')}
					/>
				</div>

				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						{t('contacts-form-email')}
					</label>
					<input
						type='email'
						id='email'
						className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400'
						placeholder={t('contacts-form-email-placeholder')}
						{...register('email')}
					/>
				</div>

				<div>
					<label
						htmlFor='message'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						{t('contacts-form-message')}
					</label>
					<textarea
						id='message'
						rows={5}
						className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400'
						placeholder={t('contacts-form-message-placeholder')}
						{...register('message')}
					></textarea>
				</div>

				<button
					type='submit'
					className='w-full py-3 px-4 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
					disabled={isPending}
				>
					{isPending && <LoaderIcon className='w-4 h-4 animate-spin' />}
					{t('contacts-form-submit')}
				</button>
			</form>
		</motion.div>
	)
}
