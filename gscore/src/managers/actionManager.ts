import { CompanionActionDefinitions } from "@companion-module/base";
import CompAction from "./actionTemplate.js";
import { ModuleInstance } from "../main.js";
import setupActions from "../companion/actionList.js";

class CompActionManager {
    private actions: CompAction[] = [];
    private companionActions: CompanionActionDefinitions = {};

    constructor() {
    }

    public addAction(action: CompAction): CompActionManager {
        this.actions.push(action);
        this.companionActions[action.Id] = {
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

    public init(): CompActionManager {
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

const ActionManager = new CompActionManager();
export default ActionManager;