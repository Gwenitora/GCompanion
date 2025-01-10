import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetStep } from "../../../../managers/presetContainers.js";
import { StartAndStopAction1_1, StartAndStopFeedback1, StartAndStopFeedback2 } from "./startStop.js";

// ================================================== Steps and Actions ================================================== //
class NextMidHour_StartAndStopAction1_1 extends StartAndStopAction1_1 {
    constructor() {
        super();
        this.options.hou = '$(?:Time_Hour) + (($(?:Time_Minute) >= 30) ? 1 : 0)';
        this.options.min = '30';
        this.options.sec = '';
        this.options.cmode = true;
        this.options.reg = '$(?:Format_WithHourNoZero)';
    }
}

class NextMidHour_StartAndStopStep1 extends CompPresetStep {
    name = 'Start / Stop';
    onClick = [
        new NextMidHour_StartAndStopAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class NextMidHour_StartAndStop extends CompPresetButton {
    id = 'startStop_NextMidHour';
    category = CompPresetCategories.Chronos;
    name = 'Next Mid Hour';

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
        text: 'Next Mid Hour'
    } as CompanionButtonStyleProps
    feedBacks = [
        new StartAndStopFeedback1(),
        new StartAndStopFeedback2()
    ];
    steps = [
        new NextMidHour_StartAndStopStep1()
    ];
}

export default NextMidHour_StartAndStop;