import { SomeCompanionActionInputField } from "@companion-module/base";
import CompAction, { actionCallback } from "../../managers/actionTemplate.js";
import VariablesCtrl from "../../utils/variables.js";
import { VarDef } from "../../utils/variables.js";
import { parseBool } from "../../utils/utils.js";

class toggleGettingMode extends CompAction {
    protected id: string = 'toggleGettingMode';
    protected name: string = 'Toogle getting key';
    protected description?: string = 'The app do not read the key of your keyboard every time, but you can enable it and disable it here.';
    protected options: SomeCompanionActionInputField[] = [];
    protected learnTimeout?: number;

    protected callback: actionCallback = () => {
        var getKeyOn = VariablesCtrl.get(VarDef.GetKeyOn);
        VariablesCtrl.set(VarDef.GetKeyOn, (!parseBool(getKeyOn)).toString());
    }
    
    protected subscribe?: undefined;
    protected unsubscribe?: undefined;
    protected learn?: undefined;
}

export default toggleGettingMode;