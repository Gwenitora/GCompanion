import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class Day extends CompPresetButton {
    id = 'day';
    category = CompPresetCategories.Dates;
    name = 'Day';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Date_Day)'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Day'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default Day;