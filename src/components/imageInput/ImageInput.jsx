import { useState, useEffect } from 'react'
import './imageInput.css'

function ImageInput(props) {
	const [preview, setPreview] = useState(null)
	const { label, message, name, register, accept, url, requiredField } = props

	const onChange = e => {
		if (e.target.files[0] === undefined) {
			setPreview(null)
		} else {
			setPreview(URL.createObjectURL(e.target.files[0]))
		}
	}

	useEffect(() => {
		if (url) {
			setPreview(url)
		}
	}, [url])

	return (
		<div className='image-input-container'>
			<span className='image-input-label'>{label} {requiredField && <span className='required'>*</span> }</span>

			<label className={`add-image ${message ? 'error' : ''}`} htmlFor={name}>
				<img
					src={
						preview ||
						'https://res.cloudinary.com/cloudinary-v3/image/upload/v1646479053/placeholder_ezsd3z.webp'
					}
					alt='preview'
				/>
				<div className='add'>
					<span>{preview ? 'Change' : 'Add'}</span>
				</div>
			</label>

			<input
				id={name}
				type='file'
				accept={accept || 'image/*'}
				name={name}
				{...register(name, {
					onChange: onChange,
				})}
			/>

			{message ? (
				<p className='error'>
					<span className='error-sign'>!</span>
					{message}
				</p>
			) : null}
		</div>
	)
}

export default ImageInput
