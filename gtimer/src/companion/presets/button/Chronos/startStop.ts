import { CompanionButtonPresetOptions, CompanionButtonStyleProps, CompanionOptionValues } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetAction, CompPresetFeedback, CompPresetStep } from "../../../../managers/presetContainers.js";
import startStopChrono from "../../../actions/StartStopChrono.js";
import { transformOptToPresetOpt } from "../../../../utils/companionUtils.js";
import chronoName from "../../../options/chronoName.js";
import chronoSetup from "../../../options/chronosSetup.js";
import isStart from "../../../feedbacks/IsStart.js";
import isPause from "../../../feedbacks/IsPause.js";

// ================================================== Feedbacks ================================================== //
class StartAndStopFeedback1 extends CompPresetFeedback {
    protected feedBack = new isStart();
    protected options: CompanionOptionValues = transformOptToPresetOpt(chronoName);
    protected style = this.feedBack.DefaultStyle;
    protected description?: string;
    protected isInverted?: boolean;

    constructor() {
        super();
        this.style.text = 'Stop\\n$(?:Chrono-Default)';
    }
}

class StartAndStopFeedback2 extends CompPresetFeedback {
    protected feedBack = new isPause();
    protected options: CompanionOptionValues = transformOptToPresetOpt(chronoName);
    protected style = this.feedBack.DefaultStyle;
    protected description?: string;
    protected isInverted?: boolean;
}

// ================================================== Steps and Actions ================================================== //
class StartAndStopAction1_1 extends CompPresetAction {
    protected action = new startStopChrono();
    protected options: CompanionOptionValues = transformOptToPresetOpt(chronoName, chronoSetup);
    protected description?: string;
    protected delay?: number;
}

class StartAndStopStep1 extends CompPresetStep {
    name = 'Start / Stop';
    onClick = [
        new StartAndStopAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class StartAndStop extends CompPresetButton {
    id = 'startStop';
    category = CompPresetCategories.Chronos;
    name = 'Start / Stop';

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
        text: 'Start / Stop'
    } as CompanionButtonStyleProps
    feedBacks = [
        new StartAndStopFeedback1(),
        new StartAndStopFeedback2()
    ];
    steps = [
        new StartAndStopStep1()
    ];
}

export default StartAndStop;