import { createContext, useContext, useEffect, useState } from "react";
import "./toast.css";
import { data } from "react-router-dom";

export const ToastContext = createContext(null);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeNotification = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addNotification = ({ title }) => {
    const id = new Date().getTime();
    const obj = { id: id, title: title };
    setToasts((prev) => [obj, ...prev]);
  };


  return (
    <>
      <ToastContext.Provider
        value={{
          addNotification: addNotification,
          toasts: toasts,
          removeNotification: removeNotification,
        }}
      >
        {children}
      </ToastContext.Provider>
    </>
  );
};

export default ToastProvider;
