import { useEffect, useState } from "react";

const Notification = ({ id = "", title = "", onRemove, type = "success" }) => {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemove(id);
    }, 3000);

    // return () => clearTimeout(timeout);
  }, [id, onRemove]);

  useEffect(() => {
    let interval = setInterval(() => {
      setWidth((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onRemove(id);
        }
        return prev - 10;
      });
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <>
      <div className={"toast-container"} data-type={type}>
        <div className="toast-items">
          <h4>{title}</h4>
          <button onClick={() => onRemove(id)}>X</button>
        </div>
        <div className="toast-progress" style={{ width: `${width}%` }} />
      </div>
    </>
  );
};

export default Notification;
