import FeedbackManager from "../managers/feedbackManager.js";
import isStart from "./feedbacks/IsStart.js";
import isPause from "./feedbacks/IsPause.js";

const setupFeedbacks = () => {
    FeedbackManager
        .addFeedback(new isStart())
        .addFeedback(new isPause())
}

export default setupFeedbacks;