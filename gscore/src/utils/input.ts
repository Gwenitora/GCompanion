import { GlobalKeyboardListener, IGlobalKeyDownMap, IGlobalKeyEvent } from "node-global-key-listener";
import VariablesCtrl, { VarDef } from "./variables.js";
import { evaluateExpression, parseBool } from "./utils.js";

const keyManager = new GlobalKeyboardListener();

export const KeyEvent = (e: IGlobalKeyEvent, globalKeyMap: IGlobalKeyDownMap, force: boolean = false) => {
    if (e.state !== 'UP' && (parseBool(VariablesCtrl.get(VarDef.GetKeyOn)) || force)) {
        var preview = VariablesCtrl.get(VarDef.Preview);
        preview = preview ? preview : '';

        switch (e.name) {
            //=================================== Numpad keys ===================================//
            case 'NUMPAD 0':
                VariablesCtrl.set(VarDef.Preview, preview + '0');
                break;
            case 'NUMPAD 1':
                VariablesCtrl.set(VarDef.Preview, preview + '1');
                break;
            case 'NUMPAD 2':
                VariablesCtrl.set(VarDef.Preview, preview + '2');
                break;
            case 'NUMPAD 3':
                VariablesCtrl.set(VarDef.Preview, preview + '3');
                break;
            case 'NUMPAD 4':
                VariablesCtrl.set(VarDef.Preview, preview + '4');
                break;
            case 'NUMPAD 5':
                VariablesCtrl.set(VarDef.Preview, preview + '5');
                break;
            case 'NUMPAD 6':
                VariablesCtrl.set(VarDef.Preview, preview + '6');
                break;
            case 'NUMPAD 7':
                VariablesCtrl.set(VarDef.Preview, preview + '7');
                break;
            case 'NUMPAD 8':
                VariablesCtrl.set(VarDef.Preview, preview + '8');
                break;
            case 'NUMPAD 9':
                VariablesCtrl.set(VarDef.Preview, preview + '9');
                break;
            case 'NUMPAD MINUS':
                VariablesCtrl.set(VarDef.Preview, preview + '-');
                break;
            case 'NUMPAD PLUS':
                VariablesCtrl.set(VarDef.Preview, preview + '+');
                break;
            case 'NUMPAD DIVIDE':
                VariablesCtrl.set(VarDef.Preview, preview + '/');
                break;
            case 'NUMPAD MULTIPLY':
                VariablesCtrl.set(VarDef.Preview, preview + '*');
                break;
            case 'NUMPAD DOT':
                VariablesCtrl.set(VarDef.Preview, preview + '.');
                break;
            //=================================== 80% Keys ===================================//
            case '0':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '0');
                }
                break;
            case '1':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '1');
                }
                break;
            case '2':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '2');
                }
                break;
            case '3':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '3');
                }
                break;
            case '4':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '4');
                }
                break;
            case '5':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '5');
                } else {
                    VariablesCtrl.set(VarDef.Preview, preview + '(');
                }
                break;
            case '6':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '6');
                } else {
                    VariablesCtrl.set(VarDef.Preview, preview + '-');
                }
                break;
            case '7':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '7');
                }
                break;
            case '8':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '8');
                }
                break;
            case '9':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '9');
                }
                break;
            case 'SQUARE BRACKET OPEN':
                if (!(globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT'])) {
                    VariablesCtrl.set(VarDef.Preview, preview + ')');
                }
                break;
            case 'EQUALS':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '+');
                }
                break;
            case 'FORWARD SLASH':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '/');
                }
                break;
            case 'BACKSLASH':
                if (!(globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT'])) {
                    VariablesCtrl.set(VarDef.Preview, preview + '*');
                }
                break;
            case 'DOT':
                if (globalKeyMap['LEFT SHIFT'] || globalKeyMap['RIGHT SHIFT']) {
                    VariablesCtrl.set(VarDef.Preview, preview + '.');
                }
                break;
            //=================================== Global Keys ===================================//
            case 'RETURN':
                const result = evaluateExpression(preview);
                VariablesCtrl.set(VarDef.Preview, isNaN(result) ? '' : result.toString());
                break;
            case 'BACKSPACE':
                if (preview.length === 0) break;
                VariablesCtrl.set(VarDef.Preview, preview.slice(0, -1));
                break;
            //=================================== Manual Keys ===================================//
            case 'O':
                if (force) {
                    VariablesCtrl.set(VarDef.Preview, preview + '(');
                }
                break;
            case 'C':
                if (force) {
                    VariablesCtrl.set(VarDef.Preview, preview + ')');
                }
                break;
            //=================================== Default ===================================//
            default:
                break;
        }
    }
}

const initInputs = () => {
    keyManager.addListener(KeyEvent);
}

export default initInputs;