import './input.css'

function Input(props) {
	return (
		<div className='input-container'>
			<label htmlFor={props.name}>
				{props.label}{' '}
				{props.requiredLabel ? <span className='required'>*</span> : null}
			</label>

			{props.type === 'textarea' ? (
				<textarea
					className={`input ${props.message ? 'error' : ''}`}
					id={props.name}
					name={props.name}
					placeholder={props.placeholder}
					{...props.register(props.name)}
					autoComplete='off'
				/>
			) : (
				<input
					className={`input ${props.message ? 'error' : ''}`}
					id={props.name}
					type={props.type}
					name={props.name}
					placeholder={props.placeholder}
					{...props.register(props.name)}
					autoComplete='off'
				/>
			)}
			{props.message ? (
				<p className='error'>
					<span className='error-sign'>!</span>
					{props.message}
				</p>
			) : null}
		</div>
	)
}

export default Input
