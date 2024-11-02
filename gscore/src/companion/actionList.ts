import ActionManager from "../managers/actionManager.js";
import setScore from "./actions/SetScore.js";
import toggleGettingMode from "./actions/ToggleGettingMode.js";
import virtualKey from "./actions/VirtualKey.js";

const setupActions = () => {
    ActionManager
        .addAction(new toggleGettingMode())
        .addAction(new virtualKey())
        .addAction(new setScore())
}

export default setupActions;