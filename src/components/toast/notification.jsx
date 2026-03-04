import './notification.css';

function Notification({
    id,
    type = "info",
    title = "",
    description = "",
    onRemove,
    cta,
    position = "top-right",
    onUpdate = () => { },
    exiting,
    progress,
    handlePauseOnHover,
    handleResumeOnHover
}) {

    const NotificationType = {
        SUCCESS: 'success',
        ERROR: 'error',
        WARNING: 'warning',
        INFO: 'info',
    }

    const IconMap = {
        [NotificationType.SUCCESS]: '✅',
        [NotificationType.ERROR]: '❌',
        [NotificationType.WARNING]: '⚠️',
        [NotificationType.INFO]: 'ℹ️',
    }

    let className = "toast-container"

    if (exiting) {
        className += " toast-exiting"
    }


    const handleRemove = () => {
        onUpdate(id);
    }

    const animationEndHandler = () => {
        onRemove(id);
    }

    function handleMouseEnter() {
        handlePauseOnHover(id);
    }

    function handleMouseLeave() {
        handleResumeOnHover(id);
    }



    return (
        <div className={className} data-position={position} data-type={type} onAnimationEnd={animationEndHandler} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <button className='toast-cancel-btn' onClick={handleRemove} >&times;</button>
            <div className="toast-content">
                <div className="toast-icon">
                    {IconMap[type]}
                </div>
                <div className="toast-main-content">
                    <div className="toast-title">{title}</div>
                    {description && <div className="toast-description">{description}</div>}
                </div>
            </div>
            {cta && <div className="toast-cta">{cta}</div>}
            <div className="toast-progress" data-type={type} style={{ width: `${progress}%` }}></div>
        </div>
    )
}

export default Notification;