import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class Time extends CompPresetButton {
    id = 'time';
    category = CompPresetCategories.Dates;
    name = 'Time';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Time_Hour)$(?:Info_ClintPoints)$(?:Time_Minute)$(?:Info_ClintPoints)$(?:Time_Second)',
        size: 17
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Time'
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default Time;