import { CompanionInputFieldTextInput, SomeCompanionActionInputField } from "@companion-module/base";
import CompAction, { actionCallback, actionSubscribe, actionUnsubscribe } from "../../managers/actionTemplate.js";
import ScoreColl from "../../utils/scoresCollection.js";
import TimeScaleEdition from "../options/timescaleEditor.js";
import { evaluateExpression } from "../../utils/utils.js";

class setTimeScale extends CompAction {
    protected id: string = 'setTimeScale';
    protected name: string = 'set the Time scale';
    protected description?: string = 'Set the speed off execution of animations, 0 to pause, if the animation played in 0 seconds it will be instant also if is paused';
    protected options: SomeCompanionActionInputField[] = [ ...TimeScaleEdition.action ];
    protected learnTimeout?: number;

    protected callback: actionCallback = async (event) => {
        event.options.value0 = evaluateExpression(await this.self.parseVariablesInString(event.options.value0 ? event.options.value0 as string : (TimeScaleEdition.action.find(e => e.id = 'value0') as CompanionInputFieldTextInput).default as string));

        event.options.value1 = evaluateExpression(await this.self.parseVariablesInString(event.options.value1 ? event.options.value1 as string : (TimeScaleEdition.action.find(e => e.id = 'value1') as CompanionInputFieldTextInput).default as string));
        event.options.value2 = evaluateExpression(await this.self.parseVariablesInString(event.options.value2 ? event.options.value2 as string : (TimeScaleEdition.action.find(e => e.id = 'value2') as CompanionInputFieldTextInput).default as string));

        ScoreColl.TimeScale = event.options.type === 0 ? (
            ScoreColl.TimeScale === 0 ? 1 : 0
        ) : (
            event.options.type === 1 ? event.options.value0 : (
                ScoreColl.TimeScale === event.options.value1 ? event.options.value2 : event.options.value1
            )
        ) as number;

        if (ScoreColl.TimeScale === undefined) {
            ScoreColl.TimeScale = 1;
        }
    }
    
    protected subscribe: actionSubscribe = () => {}

    protected unsubscribe: actionUnsubscribe = () => {}

    protected learn?: undefined;
}

export default setTimeScale;