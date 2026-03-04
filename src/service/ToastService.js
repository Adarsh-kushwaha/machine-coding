class ToastService {
    _sendNotification = null;

    registerNotification(fn) {
        this._sendNotification = fn;
    }

    showToast(data) {
        if (this._sendNotification) {
            this._sendNotification(data);
        } else {
            console.error("Toast not registered");
        }
    }
}

const toastService = new ToastService();

export default toastService;