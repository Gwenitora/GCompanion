import PresetManager from "../managers/presetManager.js";
import FullDates from "./presets/button/fullDate.js";

const setupPresets = () => {
    PresetManager
        .addPreset(new FullDates())
}

export default setupPresets;