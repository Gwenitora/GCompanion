import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class Timestamp extends CompPresetButton {
    id = 'timestamp';
    category = CompPresetCategories.Dates;
    name = 'Timestamp';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Info_Timestamp)',
        size: 17
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Timestamp',
        size: 13
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default Timestamp;