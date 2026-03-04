/*
Promblem Statement: Build Toast Notification componet with all these features
- Pass custom title and description
- Different type of notification
- Position Control
- CTA Control
- Auto close timer
- Close Control
- Progress Bar
- Pause On Hover
*/

import toastService from "../service/ToastService";


function Toast() {

    const handleAddToast = () => {
        toastService.showToast({
            title: "Success",
            description: "This is a success notification",
            type: "success",
            position: "top-right",
        })
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Toast Notification System</h1>
            <button onClick={handleAddToast}>Show Toast</button>
        </div>
    )
}

export default Toast;