import { GlobalKeyboardListener, IGlobalKeyEvent } from "node-global-key-listener";
import VariablesCtrl, { VarDef } from "./variables.js";
import { evaluateExpression, parseBool } from "./utils.js";

const keyManager = new GlobalKeyboardListener();

export const KeyEvent = (e: IGlobalKeyEvent, force: boolean = false) => {
    if (e.state !== 'UP' && (parseBool(VariablesCtrl.get(VarDef.GetKeyOn)) || force)) {
        var preview = VariablesCtrl.get(VarDef.Preview);
        preview = preview ? preview : '';
        switch (e.name) {
            case '0':
            case 'NUMPAD 0':
                VariablesCtrl.set(VarDef.Preview, preview + '0');
                break;
            case '1':
            case 'NUMPAD 1':
                VariablesCtrl.set(VarDef.Preview, preview + '1');
                break;
            case '2':
            case 'NUMPAD 2':
                VariablesCtrl.set(VarDef.Preview, preview + '2');
                break;
            case '3':
            case 'NUMPAD 3':
                VariablesCtrl.set(VarDef.Preview, preview + '3');
                break;
            case '4':
            case 'NUMPAD 4':
                VariablesCtrl.set(VarDef.Preview, preview + '4');
                break;
            case '5':
            case 'NUMPAD 5':
                VariablesCtrl.set(VarDef.Preview, preview + '5');
                break;
            case '6':
            case 'NUMPAD 6':
                VariablesCtrl.set(VarDef.Preview, preview + '6');
                break;
            case '7':
            case 'NUMPAD 7':
                VariablesCtrl.set(VarDef.Preview, preview + '7');
                break;
            case '8':
            case 'NUMPAD 8':
                VariablesCtrl.set(VarDef.Preview, preview + '8');
                break;
            case '9':
            case 'NUMPAD 9':
                VariablesCtrl.set(VarDef.Preview, preview + '9');
                break;
            case 'DOT':
            case 'NUMPAD DOT':
                VariablesCtrl.set(VarDef.Preview, preview + '.');
                break;
            case 'NUMPAD DIVIDE':
                VariablesCtrl.set(VarDef.Preview, preview + '/');
                break;
            case 'NUMPAD MULTIPLY':
                VariablesCtrl.set(VarDef.Preview, preview + '*');
                break;
            case 'NUMPAD MINUS':
                VariablesCtrl.set(VarDef.Preview, preview + '-');
                break;
            case 'NUMPAD PLUS':
                VariablesCtrl.set(VarDef.Preview, preview + '+');
                break;
            case 'RETURN':
                const result = evaluateExpression(preview);
                VariablesCtrl.set(VarDef.Preview, isNaN(result) ? '' : result.toString());
                break;
            case 'BACKSPACE':
                if (preview.length === 0) break;
                VariablesCtrl.set(VarDef.Preview, preview.slice(0, -1));
                break;
            case 'LEFT ARROW':
                VariablesCtrl.set(VarDef.Preview, preview + '(');
                break;
            case 'RIGHT ARROW':
                VariablesCtrl.set(VarDef.Preview, preview + ')');
                break;
        }
    }
}

const initInputs = () => {
    keyManager.addListener((e) => {KeyEvent(e)});
}

export default initInputs;