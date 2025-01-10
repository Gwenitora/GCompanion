import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class FullDate extends CompPresetButton {
    id = 'fullDate';
    category = CompPresetCategories.Dates;
    name = 'Full Date';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Date_WeekDay) $(?:Date_Day)\n$(?:Date_MonthName)\n$(?:Date_Year)'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Full Date'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default FullDate;