import Buzzer, { buzzerType } from "./Buzzer.js";
import physiqueBuzzers from "./physiqueBuzzers.js";

class BuzzersManager {
    private Buzzers: Buzzer[];

    constructor() {
        this.Buzzers = [];
        this.updatePhysicalBuzzers();
    }

    updatePhysicalBuzzers() {
        this.Buzzers.filter(e => e.Type !== buzzerType.Physical)
        this.Buzzers.push(...physiqueBuzzers.updateDevices())
    }
}

const buzzersManager = new BuzzersManager();

export default buzzersManager;