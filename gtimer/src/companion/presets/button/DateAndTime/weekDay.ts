import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class Weekday extends CompPresetButton {
    id = 'weekday';
    category = CompPresetCategories.Dates;
    name = 'Week day';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Date_WeekDay)',
        size: 14
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Week day'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default Weekday;