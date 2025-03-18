import { Label } from '@/components/ui/label'
import { UploadIcon, XIcon } from 'lucide-react'
import { ChangeEvent, useRef, useState } from 'react'

interface FileInputProps {
	onChange: (files: FileList | null) => void
	multiple?: boolean
	accept?: string
	label?: string
	className?: string
}

export function FileInput({ onChange, multiple, accept, label, className }: FileInputProps) {
	const [dragActive, setDragActive] = useState(false)
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])
	const inputRef = useRef<HTMLInputElement>(null)

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			setDragActive(false)
		}
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFiles(e.dataTransfer.files)
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		if (e.target.files && e.target.files[0]) {
			handleFiles(e.target.files)
		}
	}

	const handleFiles = (files: FileList) => {
		if (multiple) {
			const newFiles = Array.from(files)
			setSelectedFiles(prev => [...prev, ...newFiles])
			onChange(files)
		} else {
			setSelectedFiles([files[0]])
			onChange(files)
		}
	}

	const removeFile = (index: number) => {
		setSelectedFiles(prev => {
			const newFiles = prev.filter((_, i) => i !== index)
			if (newFiles.length === 0) {
				onChange(null)
			} else {
				// Create a new FileList-like object
				const dataTransfer = new DataTransfer()
				newFiles.forEach(file => dataTransfer.items.add(file))
				onChange(dataTransfer.files)
			}
			return newFiles
		})
	}

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
	}

	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			{label && <Label>{label}</Label>}
			<div
				className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ease-in-out cursor-pointer
					${
						dragActive
							? 'border-blue-500 bg-blue-50'
							: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
					}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
				onClick={() => inputRef.current?.click()}
			>
				<input
					ref={inputRef}
					type='file'
					multiple={multiple}
					accept={accept}
					onChange={handleChange}
					className='hidden'
				/>
				<div className='flex flex-col items-center gap-2'>
					<UploadIcon className='w-8 h-8 text-gray-400' />
					<div className='text-sm text-gray-600'>
						<span className='font-medium text-blue-500'>Натисніть для завантаження</span> або
						перетягніть файли
					</div>
					<div className='text-xs text-gray-400'>
						{accept ? `Підтримуються файли: ${accept}` : 'Підтримуються всі файли'}
					</div>
				</div>
			</div>

			{selectedFiles.length > 0 && (
				<div className='mt-4 space-y-2'>
					{selectedFiles.map((file, index) => (
						<div
							key={index}
							className='flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200'
						>
							<div className='flex items-center gap-2'>
								<span className='text-sm text-gray-700 truncate max-w-[200px]'>{file.name}</span>
								<span className='text-xs text-gray-500'>({formatFileSize(file.size)})</span>
							</div>
							<button
								type='button'
								onClick={() => removeFile(index)}
								className='p-1 hover:bg-gray-200 rounded-full transition-colors'
							>
								<XIcon className='w-4 h-4 text-gray-500' />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
