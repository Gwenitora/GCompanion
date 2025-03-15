import nodeHid from "node-hid";
import hw from "./physiqueUtils/hardware.js";
import PBuzzer from "./physiqueUtils/PBuzzer.js";

class PhysiqueBuzzers {
    private devices: {[key in string]: nodeHid.Device} = {};
    private hids: {[key in string]: nodeHid.HID} = {};
    private buzzers: PBuzzer[] = [];

    constructor() {
        this.getDevices();
    }

    public async getDevices() {
        this.devices = {};
        const devices = nodeHid.devices();
        const hids = this.hids;
        this.hids = {};
        const buzzers: PBuzzer[] = this.buzzers;
        this.buzzers = [];
        
        for (const device of devices) {
            if (device.vendorId === hw.vendorId && device.productId === hw.productId && device.path) {
                this.devices[device.path.split('#').splice(3, 1).join('#')] = device;
            }
        }

        for (const device in this.devices) {
            if (hids[device]) {
                this.hids[device] = hids[device];
            } else {
                this.hids[device] = new nodeHid.HID(this.devices[device].path as string);
            }

            for (let i = 0; i < 4; i++) {
                const finded = buzzers.find(b => b.DeviceId === device && b.Id === i);

                if (finded) {
                    this.buzzers.push(finded);
                    continue;
                }

                this.buzzers.push(new PBuzzer(this, this.devices[device], this.hids[device], device, i as 0|1|2|3));
            }
        }
    }

    public getBuzzerOfDevice(deviceId: string, id?: 0|1|2|3) {
        return this.buzzers.filter(b => b.DeviceId === deviceId && (id === undefined || b.Id === id));
    }
}

const physiqueBuzzers = new PhysiqueBuzzers();
export default physiqueBuzzers;