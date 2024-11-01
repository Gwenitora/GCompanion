import { SomeCompanionActionInputField } from "@companion-module/base";
import CompanionAction, { actionCallback } from "../../managers/actionTemplate.js";
import keysClickable from "../options/KeysClickable.js";
import { KeyEvent } from "../../utils/input.js";

class virtualKey extends CompanionAction {
    protected name: string = 'Press key';
    protected description?: string = 'If you don\'t have a keyboard, or don\'t wan\'t to use them, you can press a key here. (getting key don\'t need to be enabled)';
    protected options: SomeCompanionActionInputField[] = [ ...keysClickable.action ];
    protected learnTimeout?: number;

    protected callback: actionCallback = (event) => {
        KeyEvent({
            name: event.options.key,
        } as any, true)
    }
    
    protected subscribe?: undefined;
    protected unsubscribe?: undefined;
    protected learn?: undefined;
}

export default virtualKey;