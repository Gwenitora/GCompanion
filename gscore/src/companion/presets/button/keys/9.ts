import { CompanionButtonPresetOptions, CompanionButtonStyleProps, CompanionOptionValues } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetAction, CompPresetStep } from "../../../../managers/presetContainers.js";
import virtualKey from "../../../actions/VirtualKey.js";
import { transformOptToPresetOpt } from "../../../../utils/companionUtils.js";
import keysClickable from "../../../options/keysClickable.js";

// ================================================== Steps and Actions ================================================== //
class VirtualKey_NineAction1_1 extends CompPresetAction {
    protected action = new virtualKey();
    protected options: CompanionOptionValues = transformOptToPresetOpt(keysClickable);
    protected description?: string;
    protected delay?: number;

    constructor() {
        super();
        this.options.key = '9';
    }
}

class VirtualKey_NineStep1 extends CompPresetStep {
    name = 'Add 9 to preview';
    onClick = [
        new VirtualKey_NineAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class VirtualKey_Nine extends CompPresetButton {
    id = 'virtualNine';
    category = CompPresetCategories.Keys;
    name = '9';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '9'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: '9'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [
        new VirtualKey_NineStep1()
    ];
}

export default VirtualKey_Nine;