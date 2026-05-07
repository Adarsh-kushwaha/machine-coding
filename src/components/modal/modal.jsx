import { useRef } from "react"
import "./modal.css"

export const Modal = ({ children, onClose }) => {

    const contentRef = useRef(null)
    const backdropRef = useRef(null)

    const handleAnimationEnd = () => {
        onClose()
    }

    const handleClose = () => {
        contentRef.current.classList.add("hide-modal")
        backdropRef.current.classList.add("hide-modal")

        contentRef.current.addEventListener("animationend", handleAnimationEnd)
        backdropRef.current.addEventListener("animationend", handleAnimationEnd)
    }



    return (
        <div className="modal">
            <div className="modal-backdrop" onClick={handleClose} ref={backdropRef} />
            <div className="modal-content" ref={contentRef}>
                {children}
                {onClose && <button onClick={handleClose} className="modal-cancel">X</button>}
            </div>

        </div>
    )
}