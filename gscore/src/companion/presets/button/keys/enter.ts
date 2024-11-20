import { CompanionButtonPresetOptions, CompanionButtonStyleProps, CompanionOptionValues } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";
import { CompPresetAction, CompPresetStep } from "../../../../managers/presetContainers.js";
import virtualKey from "../../../actions/VirtualKey.js";
import { transformOptToPresetOpt } from "../../../../utils/companionUtils.js";
import keysClickable from "../../../options/keysClickable.js";

// ================================================== Steps and Actions ================================================== //
class VirtualKey_EnterAction1_1 extends CompPresetAction {
    protected action = new virtualKey();
    protected options: CompanionOptionValues = transformOptToPresetOpt(keysClickable);
    protected description?: string;
    protected delay?: number;

    constructor() {
        super();
        this.options.key = 'RETURN';
    }
}

class VirtualKey_EnterStep1 extends CompPresetStep {
    name = 'Set the preview with the result';
    onClick = [
        new VirtualKey_EnterAction1_1()
    ];
    onRelease = [];
    onRotateLeft = [];
    onRotateRight = [];
}

// ================================================== Preset ================================================== //
class VirtualKey_Enter extends CompPresetButton {
    id = 'virtualEnter';
    category = CompPresetCategories.Keys;
    name = 'calculate';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'calculate',
        size: 17
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'calculate',
        size: 17
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [
        new VirtualKey_EnterStep1()
    ];
}

export default VirtualKey_Enter;