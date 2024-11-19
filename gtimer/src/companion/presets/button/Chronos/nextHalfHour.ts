import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetStep } from "../../../../managers/presetContainers.js";
import { StartAndStopAction1_1, StartAndStopFeedback1, StartAndStopFeedback2 } from "./startStop.js";

// ================================================== Steps and Actions ================================================== //
class NextHalfHour_StartAndStopAction1_1 extends StartAndStopAction1_1 {
    constructor() {
        super();
        this.options.hou = '$(?:Time_Hour) + (($(?:Time_Minute) >= 30) ? 1 : 0)';
        this.options.min = '(($(?:Time_Minute) >= 30) ? 0 : 30)';
        this.options.sec = '';
        this.options.cmode = true;
        this.options.reg = '$(?:Format_WithHourNoZero)';
    }
}

class NextHalfHour_StartAndStopStep1 extends CompPresetStep {
    name = 'Start / Stop';
    onClick = [
        new NextHalfHour_StartAndStopAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class NextHalfHour_StartAndStop extends CompPresetButton {
    id = 'startStop_NextHalfHour';
    category = CompPresetCategories.Chronos;
    name = 'Next Half Hour';

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
        text: 'Next Half Hour'
    } as CompanionButtonStyleProps
    feedBacks = [
        new StartAndStopFeedback1(),
        new StartAndStopFeedback2()
    ];
    steps = [
        new NextHalfHour_StartAndStopStep1()
    ];
}

export default NextHalfHour_StartAndStop;