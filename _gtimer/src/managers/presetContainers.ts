import { CompanionFeedbackButtonStyleResult, CompanionOptionValues } from "@companion-module/base";
import CompFeedback, { feedbackType } from "./feedbackTemplate.js";
import CompAction from "./actionTemplate.js";

export abstract class CompPresetFeedback {
    protected abstract feedBack: CompFeedback<feedbackType>;
    protected abstract options: CompanionOptionValues;
    protected abstract style?: CompanionFeedbackButtonStyleResult;
    protected abstract description?: string;
    protected abstract isInverted?: boolean;

    public get FeedBack(): CompFeedback<feedbackType> { return this.feedBack; }
    public get Options(): CompanionOptionValues { return this.options; }
    public get Style(): CompanionFeedbackButtonStyleResult | undefined { return this.style; }
    public get Description(): string | undefined { return this.description; }
    public get IsInverted(): boolean | undefined { return this.isInverted; }
}

export abstract class CompPresetAction {
    protected abstract action: CompAction;
    protected abstract options: CompanionOptionValues;
    protected abstract description?: string;
    protected abstract delay?: number;

    public get Action(): CompAction { return this.action; }
    public get Options(): CompanionOptionValues { return this.options; }
    public get Description(): string | undefined { return this.description; }
    public get Delay(): number | undefined { return this.delay; }
}

export abstract class CompPresetStep {
    protected abstract name: string;
    protected abstract onClick: CompPresetAction[];
    protected abstract onRelease: CompPresetAction[];
    protected abstract onRotateLeft: CompPresetAction[];
    protected abstract onRotateRight: CompPresetAction[];

    public get Name(): string { return this.name; }
    public get OnClick(): CompPresetAction[] { return this.onClick; }
    public get OnRelease(): CompPresetAction[] { return this.onRelease; }
    public get OnRotateLeft(): CompPresetAction[] { return this.onRotateLeft; }
    public get OnRotateRight(): CompPresetAction[] { return this.onRotateRight; }
}