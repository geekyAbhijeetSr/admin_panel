import ReactModal from "react-modal";
import './modal.css'

ReactModal.setAppElement("#modal");

function Modal(props) {
    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="overlay"
        >
            {props.children}
        </ReactModal>
    )
}

export default Modal
