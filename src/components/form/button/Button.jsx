import './button.css'

function Button(props) {
    return (
        <button type={props.type} className={`button ${props.className} ${props.variant}`} onClick={props.onClick}>
            <span className="button__text">
                {props.children}
            </span>
        </button>
  );
}

export default Button;
