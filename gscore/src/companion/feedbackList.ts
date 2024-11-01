import FeedbackManager from "../managers/feedbackManager.js";
import inGettingMode from "./feedbacks/InGettingMode.js";

const setupFeedbacks = () => {
    FeedbackManager
        .addFeedback(new inGettingMode());
}

export default setupFeedbacks;