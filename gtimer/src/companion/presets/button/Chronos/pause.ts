import { CompanionButtonPresetOptions, CompanionButtonStyleProps, CompanionOptionValues } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetAction, CompPresetFeedback, CompPresetStep } from "../../../../managers/presetContainers.js";
import { transformOptToPresetOpt } from "../../../../utils/companionUtils.js";
import chronoName from "../../../options/chronoName.js";
import isStart from "../../../feedbacks/IsStart.js";
import pauseChrono from "../../../actions/PauseChrono.js";

// ================================================== Feedbacks ================================================== //
class PauseFeedback1 extends CompPresetFeedback {
    protected feedBack = new isStart();
    protected options: CompanionOptionValues = transformOptToPresetOpt(chronoName);
    protected style = {
        text: '',
    };
    protected description?: string;
    protected isInverted?: boolean = true;
}

// ================================================== Steps and Actions ================================================== //
class PauseAction1_1 extends CompPresetAction {
    protected action = new pauseChrono();
    protected options: CompanionOptionValues = transformOptToPresetOpt(chronoName);
    protected description?: string;
    protected delay?: number;
}

class PauseStep1 extends CompPresetStep {
    name = 'Pausing';
    onClick = [
        new PauseAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class Pause extends CompPresetButton {
    id = 'pause';
    category = CompPresetCategories.Chronos;
    name = 'Pause';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Chrono-Default)\\nPause'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Pause'
    } as CompanionButtonStyleProps
    feedBacks = [
        new PauseFeedback1()
    ];
    steps = [
        new PauseStep1()
    ];
}

export default Pause;