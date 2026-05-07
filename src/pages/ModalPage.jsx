import { useState } from "react";
import { Modal } from "../components/modal/modal";
import { createPortal } from "react-dom";

export const ModalPages = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>
      {isOpen &&
        createPortal(
          <Modal onClose={handleClose}>
            <h2>This is modal heading</h2>
            <p>Have you ever have any kind of fear against coding.</p>
          </Modal>,
          document.body,
        )}
    </div>
  );
};
