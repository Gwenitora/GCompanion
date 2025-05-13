import nodeHid from "node-hid";
import physiqueBuzzers from "../physiqueBuzzers.js";
import mapper from "./mapper.js";
import Buzzer, { buzzerType, qtBoolean } from "../Buzzer.js";

class PBuzzer extends Buzzer {
    private deviceId: string;
    private id: 0 | 1 | 2 | 3;

    private device: nodeHid.Device;
    private hid: nodeHid.HID;

    private lastMap: boolean[];
    private pBuzzers: typeof physiqueBuzzers;

    get DeviceId() { return this.deviceId; }
    get Id() { return this.id; }

    get Device() { return this.device; }

    constructor(pBuzzers: typeof physiqueBuzzers, device: nodeHid.Device, hid: nodeHid.HID, deviceId: string, id: 0 | 1 | 2 | 3) {
        super(buzzerType.Physical, id);
        this.pBuzzers = pBuzzers;
        this.device = device;
        this.hid = hid;
        this.deviceId = deviceId;
        this.id = id;
        this.lastMap = new Array(5).fill(false);

        this.prepareEvents();
    }

    public setLight(state: boolean) {
        this.UID = this.DeviceId + 'p' + this.id;

        if (this.State === state) return;
        this.State = state;
        const states = new Array(4) as boolean[];
        for (let i = 0; i < 4; i++) {
            if (i === this.id) {
                states[i] = state;
                continue;
            }
            states[i] = this.pBuzzers.getBuzzerOfDevice(this.deviceId, i as 0 | 1 | 2 | 3).some(b => b.State);
        }
        this.hid.write(
            [0x00, 0x00].concat(
                states.map(function (state) {
                    return state ? 0xff : 0x00;
                })
            )
        );
    }

    prepareEvents() {
        this.UID = this.DeviceId + 'p' + this.id;

        super.prepareEvents();

        this.hid.on("data", (data: Buffer) => {
            const map = mapper(data)[this.id];
            if (this.lastMap.toString() === map.toString()) return;
            this.onChange.invoke(map, (map.map((v, i) => v !== this.lastMap[i]) as qtBoolean));
            this.lastMap = map;
        });
    }
}

export default PBuzzer;