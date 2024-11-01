import { CompanionFeedbackDefinitions } from "@companion-module/base";
import CompanionFeedback, { feedbackType } from "./feedbackTemplate.js";
import { ModuleInstance } from "../main.js";
import setupFeedbacks from "../companion/feedbackList.js";

class CompanionFeedbacksManager {
    private feedbacks: CompanionFeedback<feedbackType>[] = [];
    private companionFeedbacks: CompanionFeedbackDefinitions = {};

    constructor() {
    }

    public addFeedback(feedback: CompanionFeedback<feedbackType>): CompanionFeedbacksManager {
        this.feedbacks.push(feedback);
        this.companionFeedbacks[feedback.constructor.name] = {
            name: feedback.Name,
            description: feedback.Description,
            type: feedback.Type,
            showInvert: feedback.ShowInvert,
            defaultStyle: feedback.DefaultStyle as any,
            options: feedback.Options,
            learnTimeout: feedback.LearnTimeout,

            callback: feedback.Callback as any,
            subscribe: feedback.Subscribe,
            unsubscribe: feedback.Unsubscribe,
            learn: feedback.Learn
        };
        return this;
    }

    public init(): CompanionFeedbacksManager {
        this.feedbacks = [];
        this.companionFeedbacks = {};
        setupFeedbacks();
        return this;
    }

    public UpdateFeedbacks(self: ModuleInstance): void {
        for (var i = 0; i < this.feedbacks.length; i++) {
            this.feedbacks[i].setSelf(self);
        }
        self.setFeedbackDefinitions(this.companionFeedbacks);
    }
}

const FeedbackManager = new CompanionFeedbacksManager();
export default FeedbackManager;