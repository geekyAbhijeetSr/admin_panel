import './select.css'

function Select(props) {
	const {
		name,
		label,
		placeholder,
		options,
		onChange,
		value,
		register,
		message,
		requiredField,
	} = props

	if (register) {
		return (
			<div className='select-input'>
				<label htmlFor={name}>
					{label} {requiredField && <span className='required'>*</span>}
				</label>
				<select
					className={`${message ? 'error' : ''}`}
					name={name}
					id={name}
					{...register(name)}
				>
					{options.map(option => (
						<option key={option.value} value={option.value}>
							{option.name}
						</option>
					))}
				</select>
				{message ? (
					<p className='error'>
						<span className='error-sign'>!</span>
						{message}
					</p>
				) : null}
			</div>
		)
	}

	return (
		<div className='select-input'>
			<label htmlFor={name}>
				{label} {requiredField && <span className='required'>*</span>}
			</label>
			<select name={name} id={name} value={value} onChange={onChange}>
				{placeholder && (
					<option value='' disabled>
						{placeholder}
					</option>
				)}

				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	)
}

export default Select
