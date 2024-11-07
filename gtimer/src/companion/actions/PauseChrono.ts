import { SomeCompanionActionInputField } from "@companion-module/base";
import CompanionAction, { actionCallback } from "../../managers/actionTemplate.js";
import ChronosColl from "../../utils/chronosCollection.js";
import chronoName from "../options/chronoName.js";

class pauseChrono extends CompanionAction {
    protected id: string = 'pauseChrono';
    protected name: string = 'Pause/Resume Chrono';
    protected description?: string = 'Pause or resume a chrono';
    protected options: SomeCompanionActionInputField[] = [ ...chronoName.action ];
    protected learnTimeout?: number;

    protected callback: actionCallback = async (event) => {
        const ch = ChronosColl.getChrono((await this.self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
        ch.Pause();
    }
    
    protected subscribe?: undefined;
    protected unsubscribe?: undefined;
    protected learn?: undefined;
}

export default pauseChrono;