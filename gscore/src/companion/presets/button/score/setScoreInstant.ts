import { CompanionButtonPresetOptions, CompanionButtonStyleProps, CompanionOptionValues } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetAction, CompPresetStep } from "../../../../managers/presetContainers.js";
import { transformOptToPresetOpt } from "../../../../utils/companionUtils.js";
import setScore from "../../../actions/SetScore.js";
import scoresName from "../../../options/scoresName.js";
import scoresParams from "../../../options/scoresParams.js";

// ================================================== Steps and Actions ================================================== //
class SetScorePresetInstantAction1_1 extends CompPresetAction {
    protected action = new setScore();
    protected options: CompanionOptionValues = transformOptToPresetOpt(scoresName, scoresParams);
    protected description?: string;
    protected delay?: number;

    constructor() {
        super();
        this.options.transiTime = '0';
    }
}

class SetScorePresetInstantStep1 extends CompPresetStep {
    name = 'Set score without transition';
    onClick = [
        new SetScorePresetInstantAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class SetScorePresetInstant extends CompPresetButton {
    id = 'setScoreInstant';
    category = CompPresetCategories.Scores;
    name = 'Set score instant';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Cat\n$(?:Score-Team_cat)'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Set score instant'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [
        new SetScorePresetInstantStep1()
    ];
}

export default SetScorePresetInstant;