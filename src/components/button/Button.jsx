import './button.css'

function Button(props) {
    const { children, className, onClick, type, variant, disabled } = props
    const toggleDisable = () => {
        return disabled ? 'button disabled' : 'button'
    }
    return (
        <button type={type} className={`button ${className} ${variant} ${disabled && 'disabled'}`} disabled={disabled} onClick={onClick}>
            <span className="button__text">
                {children}
            </span>
        </button>
  );
}

export default Button;
