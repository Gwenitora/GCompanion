import ChronosColl from "../../utils/chronosCollection.js";
import CompAction, { actionCallback } from "../../managers/actionTemplate.js";
import chronoName from "../options/chronoName.js";

class resetPauseDecal extends CompAction {
    protected id: string = 'resetPauseDecal';
    protected name: string = 'Reset Pauses';
    protected description?: string = 'Remake your chrono as same timing if you never paused it';
    protected options = [ ...chronoName.action ];
    protected learnTimeout?: number;

    protected callback: actionCallback = async (event) => {
        const ch = ChronosColl.getChrono((await this.self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
        ch.ResetPauseDecal();
    }
    
    protected subscribe?: undefined;
    protected unsubscribe?: undefined;
    protected learn?: undefined;
}

export default resetPauseDecal;