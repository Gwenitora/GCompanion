import { SomeCompanionFeedbackInputField } from "@companion-module/base/dist/index.js";
import CompFeedback, { feedbackCallback, feedbackDefaultStyle } from "../../managers/feedbackTemplate.js";
import { parseBool } from "../../utils/utils.js";
import VariablesCtrl, { VarDef } from "../../utils/variables.js";

class inGettingMode extends CompFeedback<'boolean'> {
    protected id: string = 'inGettingMode';
    protected name: string = 'Getting key enabled ?';
    protected description?: string = 'The app do not read the key of your keyboard every time, but you can see if he take here.';
    protected type: 'boolean' = 'boolean';
    protected showInvert?: boolean;
    protected defaultStyle: feedbackDefaultStyle<'boolean'> = {
        bgcolor: 0x000066
    };
    protected options: SomeCompanionFeedbackInputField[] = [];
    protected learnTimeout?: number;

    protected callback: feedbackCallback<'boolean'> = async () => {
        return parseBool(VariablesCtrl.get(VarDef.GetKeyOn));
    }

    protected subscribe?: undefined;
    protected unsubscribe?: undefined;
    protected learn?: undefined;
}

export default inGettingMode;