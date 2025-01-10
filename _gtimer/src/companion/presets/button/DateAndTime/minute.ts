import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class Minute extends CompPresetButton {
    id = 'minute';
    category = CompPresetCategories.Dates;
    name = 'Minute';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Time_Minute)'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Minute',
        size: 22
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default Minute;