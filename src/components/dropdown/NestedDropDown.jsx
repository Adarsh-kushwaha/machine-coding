import { useEffect, useRef } from "react";
import { Menulist } from "./MenuList";

export const NestedDropDown = ({ data, onSelect, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
   
    const listener = (e) => {
      if (!dropdownRef.current || dropdownRef.current.contains(e.target))
        return;
      onClose();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [onClose]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        ref={dropdownRef}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          gap: "4px",
          position: "absolute",
          top: "0px",
          left: "16px",
          background: "#d8bcbc",
          padding: "14px",
          zIndex: "100",
        }}
      >
        {data?.map((item) => (
          <div key={item.id || item.label}>
            <Menulist name={item.label} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </div>
  );
};
