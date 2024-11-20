import { CompanionButtonPresetOptions, CompanionButtonStyleProps, CompanionOptionValues } from "@companion-module/base";
import { CompPresetButton } from "../../../managers/presetTemplate.js";
import CompPresetCategories from "../Categories.js";
import { CompPresetAction, CompPresetFeedback, CompPresetStep } from "../../../managers/presetContainers.js";
import toggleGettingMode from "../../actions/ToggleGettingMode.js";
import inGettingMode from "../../feedbacks/InGettingMode.js";

// ================================================== Feedbacks ================================================== //
export class StartAndStopFeedback1 extends CompPresetFeedback {
    protected feedBack = new inGettingMode();
    protected options: CompanionOptionValues = {};
    protected style = this.feedBack.DefaultStyle;
    protected description?: string;
    protected isInverted?: boolean;
}

// ================================================== Steps and Actions ================================================== //
class BoardPreviewAction1_1 extends CompPresetAction {
    protected action = new toggleGettingMode();
    protected options: CompanionOptionValues = {};
    protected description?: string;
    protected delay?: number;
}

class BoardPreviewStep1 extends CompPresetStep {
    name = 'Toggle keyboard mode';
    onClick = [
        new BoardPreviewAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class BoardPreview extends CompPresetButton {
    id = 'boardPreview';
    category = CompPresetCategories.Keys;
    name = 'Preview';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0x660000,
        text: '$(?:Preview)',
        size: 14
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Board Preview',
        size: 19
    } as CompanionButtonStyleProps
    feedBacks = [
        new StartAndStopFeedback1()
    ];
    steps = [
        new BoardPreviewStep1()
    ];

    public toScore(): BoardPreview {
        this.category = CompPresetCategories.Scores;
        this.id = 'scoreBoardPreview';
        return this;
    }
}

export default BoardPreview;