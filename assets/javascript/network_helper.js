export class NetworkHelper {

    static isOnline() {
        return navigator.onLine;
    }

    static onStatusChange(callback) {
        const handler = () => callback(navigator.onLine);

        window.addEventListener("online", handler);
        window.addEventListener("offline", handler);

        return () => {
            window.removeEventListener("online", handler);
            window.removeEventListener("offline", handler);
        };
    }
}
