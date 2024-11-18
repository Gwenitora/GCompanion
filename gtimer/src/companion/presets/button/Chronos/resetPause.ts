import { CompanionButtonPresetOptions, CompanionButtonStyleProps, CompanionOptionValues } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetAction, CompPresetFeedback, CompPresetStep } from "../../../../managers/presetContainers.js";
import { transformOptToPresetOpt } from "../../../../utils/companionUtils.js";
import chronoName from "../../../options/chronoName.js";
import isStart from "../../../feedbacks/IsStart.js";
import resetPauseDecal from "../../../actions/ResetPauseDecal.js";

// ================================================== Feedbacks ================================================== //
class ResetPauseFeedback1 extends CompPresetFeedback {
    protected feedBack = new isStart();
    protected options: CompanionOptionValues = transformOptToPresetOpt(chronoName);
    protected style = {
        text: 'Reset Default\'s pause',
    };
    protected description?: string;
    protected isInverted?: boolean;
}

// ================================================== Steps and Actions ================================================== //
class ResetPauseAction1_1 extends CompPresetAction {
    protected action = new resetPauseDecal();
    protected options: CompanionOptionValues = transformOptToPresetOpt(chronoName);
    protected description?: string;
    protected delay?: number;
}

class ResetPauseStep1 extends CompPresetStep {
    name = 'Reset pause';
    onClick = [
        new ResetPauseAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class ResetPause extends CompPresetButton {
    id = 'rpause';
    category = CompPresetCategories.Chronos;
    name = 'Reset Pause';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Default\'s chrono'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Reset Pause'
    } as CompanionButtonStyleProps
    feedBacks = [
        new ResetPauseFeedback1()
    ];
    steps = [
        new ResetPauseStep1()
    ];
}

export default ResetPause;