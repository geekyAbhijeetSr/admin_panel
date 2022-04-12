import './input.css'

function Input(props) {
	const {
		type,
		name,
		label,
		placeholder,
		register,
		message,
	} = props
	const renderInput = () => {
		switch (type) {
			case 'textarea':
				return (
					<textarea
						className={`input ${message ? 'error' : ''}`}
						id={name}
						name={name}
						placeholder={placeholder}
						{...register(name)}
						autoComplete='off'
					/>
				)
			default:
				return (
					<input
						className={`input ${message ? 'error' : ''}`}
						id={name}
						type={type}
						name={name}
						placeholder={placeholder}
						{...register(name)}
						autoComplete='off'
					/>
				)
		}
	}

	return (
		<div className='input-container'>
			<label htmlFor={name}>
				{label}
			</label>

			{renderInput()}

			{message ? (
				<p className='error'>
					<span className='error-sign'>!</span>
					{message}
				</p>
			) : null}
		</div>
	)
}

export default Input
