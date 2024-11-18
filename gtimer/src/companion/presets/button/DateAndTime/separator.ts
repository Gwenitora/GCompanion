import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../../managers/presetTemplate.js";
import CompPresetCategories from "../../Categories.js";

class Separator extends CompPresetButton {
    id = 'separator';
    category = CompPresetCategories.Dates;
    name = 'Separator';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Info_ClintPoints)'
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Separator',
        size: 15
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];
}

export default Separator;