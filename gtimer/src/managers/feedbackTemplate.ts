import { CompanionAdvancedFeedbackResult, CompanionButtonStyleProps, CompanionFeedbackAdvancedEvent, CompanionFeedbackBooleanEvent, CompanionFeedbackContext, CompanionFeedbackInfo, CompanionOptionValues, SomeCompanionFeedbackInputField } from "@companion-module/base";
import { ModuleInstance } from "../main.js";

export type feedbackType = 'boolean' | 'advanced';
export type feedbackShowInvert<T extends feedbackType> = T extends 'boolean' ? boolean : undefined;
export type feedbackDefaultStyle<T extends feedbackType> = T extends 'boolean' ? Partial<Partial<CompanionButtonStyleProps>> : undefined;
export type feedbackCallback<T extends feedbackType> = T extends 'boolean'
    ? (event: CompanionFeedbackBooleanEvent, context: CompanionFeedbackContext) => boolean | Promise<boolean>
    : (event: CompanionFeedbackAdvancedEvent, context: CompanionFeedbackContext) => CompanionAdvancedFeedbackResult | Promise<CompanionAdvancedFeedbackResult>;
export type feedbackSubscribe = (event: CompanionFeedbackInfo, context: CompanionFeedbackContext) => void | Promise<void>;
export type feedbackUnsubscribe = (event: CompanionFeedbackInfo, context: CompanionFeedbackContext) => void | Promise<void>;
export type feedbackLearn = (event: CompanionFeedbackInfo, context: CompanionFeedbackContext) => CompanionOptionValues | undefined | Promise<CompanionOptionValues | undefined>;

abstract class CompanionFeedback<T extends feedbackType> {
    protected self: ModuleInstance;

    protected abstract id: string;
    protected abstract name: string;
    protected abstract description?: string;
    protected abstract type: T;
    protected abstract showInvert?: feedbackShowInvert<T>;
    protected abstract defaultStyle: feedbackDefaultStyle<T>;
    protected abstract options: SomeCompanionFeedbackInputField[];
    protected abstract learnTimeout?: number;

    protected abstract callback: feedbackCallback<T>;
    protected abstract subscribe?: feedbackSubscribe;
    protected abstract unsubscribe?: feedbackUnsubscribe;
    protected abstract learn?: feedbackLearn;

    constructor() {
        this.self = undefined as any;
    }
    public setSelf(self: ModuleInstance): void {
        this.self = self;
    }

    public get Id(): string { return this.id; }
    public get Name(): string { return this.name; }
    public get Description(): string | undefined { return this.description; }
    public get Type(): T { return this.type; }
    public get ShowInvert(): feedbackShowInvert<T> | undefined { return this.showInvert; }
    public get DefaultStyle(): feedbackDefaultStyle<T> { return this.defaultStyle; }
    public get Options(): SomeCompanionFeedbackInputField[] { return this.options; }
    public get LearnTimeout(): number | undefined { return this.learnTimeout; }

    public get Callback(): feedbackCallback<T> { return this.callback; }
    public get Subscribe(): feedbackSubscribe | undefined { return this.subscribe; }
    public get Unsubscribe(): feedbackUnsubscribe | undefined { return this.unsubscribe; }
    public get Learn(): feedbackLearn | undefined { return this.learn; }
}

export default CompanionFeedback;