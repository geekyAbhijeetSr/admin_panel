import { useState, useEffect } from 'react'
import * as md from 'react-icons/md'
import './imageInput.css'

function ImageInput(props) {
	const [preview, setPreview] = useState(null)
	const {
		label,
		message,
		name,
		register,
		accept,
		url,
		requiredField,
		unselect,
		setValue,
		trigger,
		cb
	} = props

	const onChange = async e => {
		if (e.target.files[0]) {
			setPreview(URL.createObjectURL(e.target.files[0]))
		}
		else setPreview(null)
		trigger && await trigger(name, { shouldFocus: true })
		cb && cb()
	}

	const clearPreviewHandler = async e => {
		e.target.value = null
		setValue(name, {length: 0})
		trigger && await trigger(name, { shouldFocus: true })
		setPreview(null)
		cb && cb()
	}

	useEffect(() => {
		if (url) {
			setPreview(url)
		}
	}, [url])

	return (
		<div className='image-input'>
			<span className='image-input__label'>
				{label} {requiredField && <span className='required'>*</span>}
			</span>

			<div className={`image-input__preview ${message ? 'error' : ''}`}>
				{preview && unselect && (
					<span
						className='image-input__clear-preview'
						onClick={clearPreviewHandler}
					>
						<md.MdClear />
					</span>
				)}
				<img
					src={
						preview ||
						'https://res.cloudinary.com/cloudinary-v3/image/upload/v1646479053/Assets/placeholder_ezsd3z.webp'
					}
					alt='preview'
				/>
				<label className='image-input__add-image' htmlFor={name}>
					<span>{preview ? 'Change' : 'Add'}</span>
				</label>
			</div>

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
				<p className='validation-error'>
					<span className='validation-error__symbol'>!</span>
					{message}
				</p>
			) : null}
		</div>
	)
}

export default ImageInput
