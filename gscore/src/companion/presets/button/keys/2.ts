import { CompanionButtonPresetOptions, CompanionButtonStyleProps, CompanionOptionValues } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetAction, CompPresetStep } from "../../../../managers/presetContainers.js";
import virtualKey from "../../../actions/VirtualKey.js";
import { transformOptToPresetOpt } from "../../../../utils/companionUtils.js";
import keysClickable from "../../../options/keysClickable.js";

// ================================================== Steps and Actions ================================================== //
class VirtualKey_TwoAction1_1 extends CompPresetAction {
    protected action = new virtualKey();
    protected options: CompanionOptionValues = transformOptToPresetOpt(keysClickable);
    protected description?: string;
    protected delay?: number;

    constructor() {
        super();
        this.options.key = '2';
    }
}

class VirtualKey_TwoStep1 extends CompPresetStep {
    name = 'Add 2 to preview';
    onClick = [
        new VirtualKey_TwoAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class VirtualKey_Two extends CompPresetButton {
    id = 'virtualTwo';
    category = CompPresetCategories.Keys;
    name = '2';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '2'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: '2'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [
        new VirtualKey_TwoStep1()
    ];
}

export default VirtualKey_Two;