import { useEffect, useRef } from "react";
import "./Reusable.css";
import { createPortal } from "react-dom";

export const ReusableDialog = ({ children, onClose }) => {
  const backdropRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyUp);
    };
  }, []);

  const handleEndAnimation = () => {
    onClose();
  };

  const handleClose = () => {
    contentRef.current.classList.add("hide-dialog");
    backdropRef.current.classList.add("hide-dialog");

    contentRef.current.addEventListener("animationend", handleEndAnimation, {
      once: true,
    });
  };

  const handleKeyUp = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    createPortal(<div className="dialog-container">
      <div
        className="dialog-backdrop"
        onClick={handleClose}
        ref={backdropRef}
      />
      <div className="dialog-content" ref={contentRef}>
        <button onClick={handleClose} className="dialog-btn">
          X
        </button>
        {children}
      </div>
    </div>, document.getElementsByTagName("body")[0])
  );
};
