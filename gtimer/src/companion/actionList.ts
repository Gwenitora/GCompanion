import pauseChrono from "./actions/PauseChrono.js";
import startStopChrono from "./actions/StartStopChrono.js";
import ActionManager from "../managers/actionManager.js";
import resetPauseDecal from "./actions/ResetPauseDecal.js";

const setupActions = () => {
    ActionManager
        .addAction(new startStopChrono())
        .addAction(new resetPauseDecal())
        .addAction(new pauseChrono())
}

export default setupActions;