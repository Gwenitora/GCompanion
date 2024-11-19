import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetStep } from "../../../../managers/presetContainers.js";
import { StartAndStopAction1_1, StartAndStopFeedback1, StartAndStopFeedback2 } from "./startStop.js";

// ================================================== Steps and Actions ================================================== //
class NextHour_StartAndStopAction1_1 extends StartAndStopAction1_1 {
    constructor() {
        super();
        this.options.hou = '$(?:Time_Hour)+1';
        this.options.min = '';
        this.options.sec = '';
        this.options.cmode = true;
        this.options.reg = '$(?:Format_WithHourNoZero)';
    }
}

class NextHour_StartAndStopStep1 extends CompPresetStep {
    name = 'Start / Stop';
    onClick = [
        new NextHour_StartAndStopAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class NextHour_StartAndStop extends CompPresetButton {
    id = 'startStop_NextHour';
    category = CompPresetCategories.Chronos;
    name = 'Next Hour';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0xff0000,
        text: 'Start\\n$(?:Chrono-Default)'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Next Hour'
    } as CompanionButtonStyleProps
    feedBacks = [
        new StartAndStopFeedback1(),
        new StartAndStopFeedback2()
    ];
    steps = [
        new NextHour_StartAndStopStep1()
    ];
}

export default NextHour_StartAndStop;