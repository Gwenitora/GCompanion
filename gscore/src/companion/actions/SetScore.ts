import { SomeCompanionActionInputField } from "@companion-module/base";
import CompanionAction, { actionCallback, actionSubscribe, actionUnsubscribe } from "../../managers/actionTemplate.js";
import ScoreColl from "../../utils/scoresCollection.js";
import scoresName from "../options/scoresName.js";
import scoresParams from "../options/scoresParams.js";
import VariablesCtrl from "../../utils/variables.js";
import { VarDef } from "../../utils/variables.js";
import { evaluateExpression } from "../../utils/utils.js";

class setScore extends CompanionAction {
    protected id: string = 'setScore';
    protected name: string = 'Set Score from preview';
    protected description?: string = 'To set the score, you can use the preview to write the score you want, and then press this button to set it. (all mode compatible with that one: set, reset, add & sub)';
    protected options: SomeCompanionActionInputField[] = [ ...scoresName.action, ...scoresParams.action ];
    protected learnTimeout?: number;

    protected callback: actionCallback = async (event) => {
        const sc = ScoreColl.getScore((await this.self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
        sc.Regex = event.options.reg as string;
        sc.Digits = event.options.digits as number;
        var tTime = evaluateExpression(await this.self.parseVariablesInString(event.options.transiTime as string));
            tTime = isNaN(tTime) ? 0 : tTime;
        sc.TransiLenght = tTime < 0 ? 0 : tTime;
        sc.EasingAlgo = event.options.transitionAlgorithm as any;
        sc.EasingType = event.options.fadeType as any;
        sc.setScore(VariablesCtrl.get(VarDef.Preview));
    }
    
    protected subscribe: actionSubscribe = async (event) => {
        const sc = ScoreColl.addScore((await this.self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
        sc.addInstance(event.id);
        sc.Regex = event.options.reg as string;
        sc.Digits = event.options.digits as number;
    }

    protected unsubscribe: actionUnsubscribe = async (event) => {
        const sc = ScoreColl.getScore((await this.self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
        sc?.RemoveInstance(event.id);
    }

    protected learn?: undefined;
}

export default setScore;