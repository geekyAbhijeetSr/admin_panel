import './input.css'

function Input(props) {
	const { type, name, label, placeholder, register, message, requiredField } =
		props
	const renderInput = () => {
		switch (type) {
			case 'textarea':
				return (
					<textarea
						className={`input__inp ${message ? 'error' : ''}`}
						id={name}
						name={name}
						placeholder={placeholder}
						{...register(name)}
						autoComplete='off'
						spellCheck='true'
					/>
				)
			default:
				return (
					<input
						className={`input__inp ${message ? 'error' : ''}`}
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
		<div className='input'>
			<label htmlFor={name}>
				{label} {requiredField && <span className='required'>*</span>}
			</label>

			{renderInput()}

			{message ? (
				<p className='validation-error'>
					<span className='validation-error__symbol'>!</span>
					{message}
				</p>
			) : null}
		</div>
	)
}

export default Input
