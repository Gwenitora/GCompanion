import { CompanionButtonPresetOptions, CompanionButtonStyleProps } from "@companion-module/base";
import { CompPresetFeedback, CompPresetStep } from "./presetContainers.js";
import CompPresetCategories from "../companion/presets/Categories.js";

abstract class CompPreset {
    
    protected abstract id: string;
    protected abstract type: 'button' | 'text';
    protected abstract category: CompPresetCategories;
    protected abstract name: string;

    public get Id(): string { return this.id; }
    public get Type(): 'button' | 'text' { return this.type; }
    public get Category(): string { return this.category; }
    public get Name(): string { return this.name; }
}

export abstract class CompPresetButton extends CompPreset {
    protected type: "button" = "button";
    protected abstract options: CompanionButtonPresetOptions;
    protected abstract style: CompanionButtonStyleProps;
    protected abstract previewStyle: CompanionButtonStyleProps;
    protected abstract feedBacks: CompPresetFeedback[];
    protected abstract steps: CompPresetStep[];

    public get Options(): CompanionButtonPresetOptions { return this.options; }
    public get Style(): CompanionButtonStyleProps { return this.style; }
    public get PreviewStyle(): CompanionButtonStyleProps { return this.previewStyle; }
    public get FeedBacks(): CompPresetFeedback[] { return this.feedBacks; }
    public get Steps(): CompPresetStep[] { return this.steps; }
}

export abstract class CompPresetText extends CompPreset {
    protected type: "text" = "text";
    protected abstract text: string;

    public get Text(): string { return this.text; }
}

export default CompPreset;