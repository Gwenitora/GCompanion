import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class Year extends CompPresetButton {
    id = 'year';
    category = CompPresetCategories.Dates;
    name = 'Year';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Date_Year)',
        size: 30
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Year'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default Year;