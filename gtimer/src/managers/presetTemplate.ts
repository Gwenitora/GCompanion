import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompanionPresetFeedback, CompanionPresetStep } from "./presetContainers.js";
import CompanionPresetCategories from "../companion/presets/Categories.js";

abstract class CompanionPreset {
    
    protected abstract id: string;
    protected abstract type: 'button' | 'text';
    protected abstract category: CompanionPresetCategories;
    protected abstract name: string;

    public get Id(): string { return this.id; }
    public get Type(): 'button' | 'text' { return this.type; }
    public get Category(): string { return this.category; }
    public get Name(): string { return this.name; }
}

export abstract class CompanionPresetButton extends CompanionPreset {
    protected type: "button" = "button";
    protected abstract options: CompanionButtonPresetOptions;
    protected abstract style: CompanionButtonStyleProps;
    protected abstract previewStyle: CompanionButtonStyleProps;
    protected abstract feedBacks: CompanionPresetFeedback[];
    protected abstract steps: CompanionPresetStep[];

    public get Options(): CompanionButtonPresetOptions { return this.options; }
    public get Style(): CompanionButtonStyleProps { return this.style; }
    public get PreviewStyle(): CompanionButtonStyleProps { return this.previewStyle; }
    public get FeedBacks(): CompanionPresetFeedback[] { return this.feedBacks; }
    public get Steps(): CompanionPresetStep[] { return this.steps; }
}

export abstract class CompanionPresetText extends CompanionPreset {
    protected type: "text" = "text";
    protected abstract text: string;

    public get Text(): string { return this.text; }
}

export default CompanionPreset;