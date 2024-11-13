import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../managers/presetTemplate.js";
import CompPresetCategories from "../Categories.js";

class FullDates extends CompPresetButton {
    id = 'testBId';
    category = CompPresetCategories.Dates;
    name = 'Test Preset';

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

export default FullDates;