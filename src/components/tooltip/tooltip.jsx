import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./tooltip.css";

export default function Tooltip({
   children,
  content,
  placement = "bottom",
}) {
  
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const ref = useRef();

  const calculatePosition = (rect) => {
    const gap = 8;

    switch (placement) {
      case "top":
        return {
          top: rect.top - gap,
          left: rect.left + rect.width / 2
        };

      case "bottom":
        return {
          top: rect.bottom + gap,
          left: rect.left + rect.width / 2
        };

      case "left":
        return {
          top: rect.top + rect.height / 2,
          left: rect.left - gap
        };

      case "right":
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + gap
        };

      default:
        return {};
    }
  };

  const handleMouseEnter = () => {
    const rect = ref.current.getBoundingClientRect();
    const pos = calculatePosition(rect);

    setCoords(pos);
    setVisible(true);
  };

  const handleMouseLeave = () => setVisible(false);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: "inline-block" }}
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            className={`tooltip tooltip-${placement}`}
            style={{
              "--tooltip-top": `${coords.top}px`,
              "--tooltip-left": `${coords.left}px`
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}