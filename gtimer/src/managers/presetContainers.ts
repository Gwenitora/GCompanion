import { CompanionFeedbackButtonStyleResult, CompanionOptionValues } from "@companion-module/base";
import CompanionFeedback, { feedbackType } from "./feedbackTemplate.js";
import CompanionAction from "./actionTemplate.js";

export abstract class CompanionPresetFeedback {
    protected abstract feedBack: CompanionFeedback<feedbackType>;
    protected abstract options: CompanionOptionValues;
    protected abstract style?: CompanionFeedbackButtonStyleResult;
    protected abstract description?: string;
    protected abstract isInverted?: boolean;

    public get FeedBack(): CompanionFeedback<feedbackType> { return this.feedBack; }
    public get Options(): CompanionOptionValues { return this.options; }
    public get Style(): CompanionFeedbackButtonStyleResult | undefined { return this.style; }
    public get Description(): string | undefined { return this.description; }
    public get IsInverted(): boolean | undefined { return this.isInverted; }
}

export abstract class CompanionPresetAction {
    protected abstract action: CompanionAction;
    protected abstract options: CompanionOptionValues;
    protected abstract description?: string;
    protected abstract delay?: number;

    public get Action(): CompanionAction { return this.action; }
    public get Options(): CompanionOptionValues { return this.options; }
    public get Description(): string | undefined { return this.description; }
    public get Delay(): number | undefined { return this.delay; }
}

export abstract class CompanionPresetStep {
    protected abstract name: string;
    protected abstract onClick: CompanionPresetAction[];
    protected abstract onRelease: CompanionPresetAction[];
    protected abstract onRotateLeft: CompanionPresetAction[];
    protected abstract onRotateRight: CompanionPresetAction[];

    public get Name(): string { return this.name; }
    public get OnClick(): CompanionPresetAction[] { return this.onClick; }
    public get OnRelease(): CompanionPresetAction[] { return this.onRelease; }
    public get OnRotateLeft(): CompanionPresetAction[] { return this.onRotateLeft; }
    public get OnRotateRight(): CompanionPresetAction[] { return this.onRotateRight; }
}