import PresetManager from "../managers/presetManager.js";
import VirtualKey_Zero from "./presets/button/keys/0.js";
import VirtualKey_One from "./presets/button/keys/1.js";
import VirtualKey_Two from "./presets/button/keys/2.js";
import VirtualKey_Three from "./presets/button/keys/3.js";
import VirtualKey_Four from "./presets/button/keys/4.js";
import VirtualKey_Five from "./presets/button/keys/5.js";
import VirtualKey_Six from "./presets/button/keys/6.js";
import VirtualKey_Seven from "./presets/button/keys/7.js";
import VirtualKey_Eight from "./presets/button/keys/8.js";
import VirtualKey_Nine from "./presets/button/keys/9.js";
import VirtualMaths from "./presets/text/maths.js";
import VirtualNumbers from "./presets/text/numbers.js";
import VirtualOthers from "./presets/text/other.js";

const setupPresets = () => {
    PresetManager
        .addPreset(new VirtualNumbers())
        .addPreset(new VirtualKey_Zero())
        .addPreset(new VirtualKey_One())
        .addPreset(new VirtualKey_Two())
        .addPreset(new VirtualKey_Three())
        .addPreset(new VirtualKey_Four())
        .addPreset(new VirtualKey_Five())
        .addPreset(new VirtualKey_Six())
        .addPreset(new VirtualKey_Seven())
        .addPreset(new VirtualKey_Eight())
        .addPreset(new VirtualKey_Nine())
        .addPreset(new VirtualMaths())
        .addPreset(new VirtualOthers())
}

export default setupPresets;