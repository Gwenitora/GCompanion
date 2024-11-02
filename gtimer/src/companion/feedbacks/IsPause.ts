import { SomeCompanionFeedbackInputField } from "@companion-module/base/dist/index.js";
import CompanionFeedback, { feedbackCallback, feedbackDefaultStyle, feedbackSubscribe } from "../../managers/feedbackTemplate.js";
import chronoName from "../options/chronoName.js";
import dataLink from "../../utils/dataLink.js";
import ChronosColl from "../../utils/chronosCollection.js";

class isPause extends CompanionFeedback<'boolean'> {
    protected name: string = 'Chrono pauseed';
    protected description?: string = 'Check if a chrono is paused, if is not running, is never paused';
    protected type: 'boolean' = 'boolean';
    protected showInvert?: boolean;
    protected defaultStyle: feedbackDefaultStyle<'boolean'> = {
        bgcolor: 0x0052ff,
        color: 0x000000,
    };
    protected options: SomeCompanionFeedbackInputField[] = [ ...chronoName.feedback ];
    protected learnTimeout?: number;

    protected callback: feedbackCallback<'boolean'> = async (event) => {
        try {
            return ChronosColl.getChrono(dataLink.getDatas(event.id)).IsPaused;
        } catch (e) {
            return false;
        }
    }

    protected subscribe: feedbackSubscribe = async (event) => {
        dataLink.setDatas(event.id, (await this.self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
    }
    protected unsubscribe?: undefined;
    protected learn?: undefined;
}

export default isPause;