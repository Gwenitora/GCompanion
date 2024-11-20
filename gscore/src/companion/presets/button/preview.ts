import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetButton } from "../../../managers/presetTemplate.js";
import CompPresetCategories from "../Categories.js";

// ================================================== Preset ================================================== //
class Preview extends CompPresetButton {
    id = 'preview';
    category = CompPresetCategories.Keys;
    name = 'Preview';

    options = {
    } as CompanionButtonPresetOptions
    style = {
        color: 0xffffff,
        bgcolor: 0,
        text: '$(?:Preview)',
        size: 14
    } as CompanionButtonStyleProps
    previewStyle = {
        color: 0xffffff,
        bgcolor: 0,
        text: 'Preview',
        size: 19
    } as CompanionButtonStyleProps
    feedBacks = [];
    steps = [];

    public toScore(): Preview {
        this.category = CompPresetCategories.Scores;
        this.id = 'scorePreview';
        return this;
    }
}

export default Preview;