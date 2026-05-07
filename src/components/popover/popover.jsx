import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./popover.css";

export const Popover = ({ children, content, placement = "top" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const calculatePosition = (rect) => {
    const gap = 10;
    switch (placement) {
      case "top":
        return {
          top: rect.top - gap,
          left: rect.left + rect.width / 2,
        };
      default:
        return {};
    }
  };

  const handleTrigger = () => {
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords(calculatePosition(rect));
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (!(e.target instanceof Node)) return;
      
      if (
        popoverRef.current?.contains(e.target) || 
        triggerRef.current?.contains(e.target)
      ) {
        return;
      }
      setIsOpen(false);
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <span
        ref={triggerRef}
        onClick={handleTrigger}
        style={{ display: "inline-block" }}
      >
        {children}
      </span>

      {isOpen &&
        createPortal(
          <div
            data-placement={placement}
            ref={popoverRef}
            className="popover"
            style={{
              top: coords.top,
              left: coords.left,
            }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
};