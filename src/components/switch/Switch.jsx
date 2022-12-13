import './switch.css'

function Switch({ checked, onChange }) {
	return (
		<div>
			<label className='switch'>
				<input onChange={onChange} checked={checked} type='checkbox' />
				<span className='slider round'></span>
			</label>
		</div>
	)
}

export default Switch
