import { CompanionActionDefinitions } from "@companion-module/base";
import CompanionAction from "./actionTemplate.js";
import { ModuleInstance } from "../main.js";
import setupActions from "../companion/actionList.js";

class CompanionActionManager {
    private actions: CompanionAction[] = [];
    private companionActions: CompanionActionDefinitions = {};

    constructor() {
    }

    public addAction(action: CompanionAction): CompanionActionManager {
        this.actions.push(action);
        this.companionActions[action.constructor.name] = {
            name: action.Name,
            description: action.Description,
            options: action.Options,
            learnTimeout: action.LearnTimeout,

            callback: action.Callback,
            subscribe: action.Subscribe,
            unsubscribe: action.Unsubscribe,
            learn: action.Learn
        };
        return this;
    }

    public init(): CompanionActionManager {
        this.actions = [];
        this.companionActions = {};
        setupActions();
        return this;
    }

    public UpdateActions(self: ModuleInstance): void {
        for (var i = 0; i < this.actions.length; i++) {
            this.actions[i].setSelf(self);
        }
        self.setActionDefinitions(this.companionActions);
    }
}

const ActionManager = new CompanionActionManager();
export default ActionManager;