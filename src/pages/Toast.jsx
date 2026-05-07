import { useState } from "react";
import Notification from "../components/toast/notification";
import { useToast } from "../components/toast/use-toast";

function Toast() {
  const { addNotification, toasts, removeNotification } = useToast();

  const handleToast = () => {
    addNotification({ title: `Toast ${toasts.length}` });
  };



  return (
    <>
      {toasts?.length > 0 && (<div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          height: "100vh",
        }}
      >
        {toasts?.map((toast) => (
          <Notification title={toast?.title} id={toast?.id} onRemove={() => removeNotification(toast.id)} />
        ))}
      </div>)}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <button onClick={handleToast}>Show toast</button>
      </div>
    </>
  );
}

export default Toast;
