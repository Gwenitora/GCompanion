import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class Hour extends CompPresetButton {
    id = 'hour';
    category = CompPresetCategories.Dates;
    name = 'Hour';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Time_Hour)'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Hour'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default Hour;