import './switch.css'

function Switch({active, onClick}) {
    return (
        <div>
            <label className="switch">
                <input onClick={onClick} className={active ? 'active' : ''} type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Switch
