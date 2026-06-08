export class BatteryHelper {

    battery = null;

    async init() {
        if (!navigator.getBattery) {
            console.warn("Battery Status API is not supported.");
            return false;
        }

        this.battery = await navigator.getBattery();
        return true;
    }

    getLevel() {
        if (!this.battery) return null;
        return `${this.battery.level * 100}%`;
    }

    isCharging() {
        if (!this.battery) return false;
        return this.battery.charging;
    }

    onLevelChange(callback) {
        if (!this.battery) return;
        this.battery.addEventListener("levelchange", () => {
            callback(this.getLevel());
        });
    }

    onChargingChange(callback) {
        if (!this.battery) return;
        this.battery.addEventListener("chargingchange", () => {
            callback(this.isCharging());
        });
    }

    destroy() {
        if (!this.battery) return;
        this.battery.removeEventListener("levelchange", this.onLevelChange);
        this.battery.removeEventListener("chargingchange", this.onChargingChange);
        this.battery = null;
    }
}
