import React, { useCallback, useEffect } from "react";
import NotificationList from "../components/toast/notification-list";
import toastService from "../service/ToastService";

const ToastContext = React.createContext();


export const useNotification = () => {
    return React.useContext(ToastContext);
}


function ToastProvider({ children }) {

    const [toastList, setToastList] = React.useState([]);


    function onRemove(id) {
        setToastList((prev) => prev.filter((toast) => toast.id !== id))
    }


    const addNotification = useCallback(({ title, description, type, position, cta, duration = 3000 }) => {
        const id = Date.now().toString();
        const newToast = {
            id,
            title,
            description,
            type,
            position,
            cta,
            progress: 100,
            duration,
            preventProgress: false

        }
        setToastList((prev) => [newToast, ...prev])
    }, [])


    function handlePauseOnHover(id) {
        setToastList((prev) => prev.map((toast) => {
            if (toast.id === id) {
                return { ...toast, preventProgress: true };
            }
            return toast;
        }))
    }

    function handleResumeOnHover(id) {
        setToastList((prev) => prev.map((toast) => {
            if (toast.id === id) {
                return { ...toast, preventProgress: false };
            }
            return toast;
        }))
    }


    function onUpdate(id) {
        setToastList((prev) => prev.map((toast) => {
            toast.exiting = toast.id === id ? true : false;
            return toast;
        }))
    }


    useEffect(() => {
        toastService.registerNotification(addNotification);
        return () => {
            toastService.registerNotification(null);
        }
    }, [addNotification])


    useEffect(() => {
        const intervalTime = 10
        const interval = setInterval(() => {
            setToastList((prev) => prev.map((toast) => {
                if (toast.preventProgress) {
                    return toast;
                }

                const percentageToReduce = (intervalTime / toast.duration) * 100;
                const newProgress = toast.progress - percentageToReduce;

                if (newProgress <= 0) {
                    return null;
                }
                return { ...toast, progress: newProgress };
            }).filter(Boolean))
        }, intervalTime)
        return () => clearInterval(interval)
    }, [])



    return (
        <ToastContext.Provider value={{ addNotification }}>
            {children}
            <NotificationList toastList={toastList} onRemove={onRemove} onUpdate={onUpdate} handlePauseOnHover={handlePauseOnHover} handleResumeOnHover={handleResumeOnHover} />
        </ToastContext.Provider>
    )
}

export default ToastProvider;
