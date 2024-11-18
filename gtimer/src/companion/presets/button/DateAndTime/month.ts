import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class MonthName extends CompPresetButton {
    id = 'monthName';
    category = CompPresetCategories.Dates;
    name = 'Month Name'

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Date_MonthName)',
        size: 14
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Month Name'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default MonthName;