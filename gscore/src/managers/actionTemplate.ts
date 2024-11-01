import { CompanionActionContext, CompanionActionEvent, CompanionActionInfo, CompanionOptionValues, SomeCompanionActionInputField } from "@companion-module/base";
import { ModuleInstance } from "../main.js";

export type actionCallback = (event: CompanionActionEvent, context: CompanionActionContext) => Promise<void> | void;
export type actionSubscribe = (event: CompanionActionInfo, context: CompanionActionContext) => Promise<void> | void;
export type actionUnsubscribe = (event: CompanionActionInfo, context: CompanionActionContext) => Promise<void> | void;
export type actionLearn = (event: CompanionActionEvent, context: CompanionActionContext) => CompanionOptionValues | undefined | Promise<CompanionOptionValues | undefined>;

abstract class CompanionAction {
    protected self: ModuleInstance;
    protected abstract name: string;
    protected abstract description?: string;
    protected abstract options: SomeCompanionActionInputField[];
    protected abstract learnTimeout?: number;

    protected abstract callback: actionCallback
    protected abstract subscribe?: actionSubscribe
    protected abstract unsubscribe?: actionUnsubscribe
    protected abstract learn?: actionLearn

    constructor() {
        this.self = undefined as any;
    }
    public setSelf(self: ModuleInstance): void {
        this.self = self;
    }

    public get Name(): string { return this.name; }
    public get Description(): string | undefined { return this.description; }
    public get Options(): SomeCompanionActionInputField[] { return this.options; }
    public get LearnTimeout(): number | undefined { return this.learnTimeout; }

    public get Callback(): actionCallback { return this.callback; }
    public get Subscribe(): actionSubscribe | undefined { return this.subscribe; }
    public get Unsubscribe(): actionUnsubscribe | undefined { return this.unsubscribe; }
    public get Learn(): actionLearn | undefined { return this.learn; }
}

export default CompanionAction;