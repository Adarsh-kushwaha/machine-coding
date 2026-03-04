import Notification from "./notification";
import "./notification.css"

function NotificationList({ toastList = [], onRemove, onUpdate, handlePauseOnHover, handleResumeOnHover }) {


    return (
        <div className="toast-list" data-position="top-right">
            {toastList.map((toast) => (
                <Notification
                    key={toast.id}
                    {...toast}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                    handlePauseOnHover={handlePauseOnHover}
                    handleResumeOnHover={handleResumeOnHover}
                />
            ))}
        </div>
    )
}

export default NotificationList;
