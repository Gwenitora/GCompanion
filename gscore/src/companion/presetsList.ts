import PresetManager from "../managers/presetManager.js";
import BoardPreview from "./presets/button/boardPreview.js";
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
import VirtualKey_Divide from "./presets/button/keys/divide.js";
import VirtualKey_Dot from "./presets/button/keys/dot.js";
import VirtualKey_Enter from "./presets/button/keys/enter.js";
import VirtualKey_Erease from "./presets/button/keys/erease.js";
import VirtualKey_Minus from "./presets/button/keys/minus.js";
import VirtualKey_Multiply from "./presets/button/keys/multiply.js";
import VirtualKey_LeftParenthese from "./presets/button/keys/parentheseLeft.js";
import VirtualKey_RightParenthese from "./presets/button/keys/parentheseRight.js";
import VirtualKey_Plus from "./presets/button/keys/plus.js";
import Preview from "./presets/button/preview.js";
import VirtualMaths from "./presets/text/maths.js";
import VirtualNumbers from "./presets/text/numbers.js";
import VirtualOthers from "./presets/text/other.js";

const setupPresets = () => {
    PresetManager
        .addPreset(new BoardPreview())
        .addPreset(new Preview())
        
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
        .addPreset(new VirtualKey_Plus())
        .addPreset(new VirtualKey_Minus())
        .addPreset(new VirtualKey_Multiply())
        .addPreset(new VirtualKey_Divide())
        .addPreset(new VirtualKey_LeftParenthese())
        .addPreset(new VirtualKey_RightParenthese())

        .addPreset(new VirtualOthers())
        .addPreset(new VirtualKey_Dot())
        .addPreset(new VirtualKey_Erease())
        .addPreset(new VirtualKey_Enter())

        // ==================== //

        .addPreset(new BoardPreview().toScore())
        .addPreset(new Preview().toScore());
}

export default setupPresets;