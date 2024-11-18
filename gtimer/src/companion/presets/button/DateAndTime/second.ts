import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class Second extends CompPresetButton {
    id = 'second';
    category = CompPresetCategories.Dates;
    name = 'Second';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Time_Second)'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Second',
        size: 20
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default Second;