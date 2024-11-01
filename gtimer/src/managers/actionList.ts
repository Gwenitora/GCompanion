import pauseChrono from "../companion/actions/PauseChrono.js";
import startStopChrono from "../companion/actions/StartStopChrono.js";
import ActionManager from "./actionManager.js";

const setupActions = () => {
    ActionManager
        .addAction(new startStopChrono())
        .addAction(new pauseChrono())
}

export default setupActions;