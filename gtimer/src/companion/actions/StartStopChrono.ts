import { CompanionActionEvent, CompanionActionInfo, SomeCompanionActionInputField } from "@companion-module/base";
import CompAction, { actionCallback, actionSubscribe, actionUnsubscribe } from "../../managers/actionTemplate.js";
import ChronosColl, { Chrono } from "../../utils/chronosCollection.js";
import { evaluateExpression, mod } from "../../utils/utils.js";
import dataLink from "../../utils/dataLink.js";
import chronoName from "../options/chronoName.js";
import chronoSetup from "../options/chronosSetup.js";

class startStopChrono extends CompAction {
    protected id: string = 'startStopChrono';
    protected name: string = 'Start/Stop Chrono';
    protected description?: string = 'Start a new Chrono or stop it the existing';
    protected options: SomeCompanionActionInputField[] = [ ...chronoName.action, ...chronoSetup.action ]
    protected learnTimeout?: number;

    protected callback: actionCallback = async (event) => {
        const ch = ChronosColl.addChrono((await this.self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
        await this.updateDatasChrono(ch, event);
        if (!ch.IsStarted) {
            ch.Start();
        } else {
            ch.Stop();
        }
    }
    
    protected subscribe: actionSubscribe = async (event) => {
        const ch = ChronosColl.addChrono((await this.self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
        ch.addInstance(event.id);

        if (event.options.makeUpdate !== dataLink.getDatas(event.id)) {
            await this.updateDatasChrono(ch, event);
            dataLink.setDatas(event.id, event.options.makeUpdate)
        }
    }

    protected unsubscribe: actionUnsubscribe = async (event) => {
        const ch = ChronosColl.getChrono((await this.self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
        ch?.RemoveInstance(event.id);
    }

    protected learn?: undefined;


    private async updateDatasChrono(ch: Chrono, event: CompanionActionEvent | CompanionActionInfo) {
        ch.CountDown = event.options.countdown as boolean;
        ch.ResetOnEnd = event.options.reset as boolean;
        var hou;
        var min;
        var sec;
        try {
            hou = evaluateExpression(await this.self.parseVariablesInString(event.options.hou as string));
        } catch (err) {
            hou = 0;
        }
        try {
            min = evaluateExpression(await this.self.parseVariablesInString(event.options.min as string));
        } catch (err) {
            min = 0;
        }
        try {
            sec = evaluateExpression(await this.self.parseVariablesInString(event.options.sec as string));
        } catch (err) {
            sec = 0;
        }
        hou = hou ? hou : 0;
        min = min ? min : 0;
        sec = sec ? sec : 0;
        var Lenght = hou * 60 * 60 + min * 60 + sec;
        if (event.options.cmode as boolean) {
            Lenght = mod(Lenght, (24 * 60 * 60));
            var date;
            var now;
            if (ch.IsStarted) {
                now = ch.StartTimestamp;
                date = new Date(now);
                now = (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
            } else {
                date = new Date(Date.now());
                now = (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
            }
            Lenght = Lenght - now;
            ch.Lenght = mod(Lenght, (24 * 60 * 60));
        } else {
            ch.Lenght = Lenght;
        }
        ch.Regex = await this.self.parseVariablesInString(event.options.reg as string);
        ch.RegexEnd = await this.self.parseVariablesInString(event.options.regEnd as string);
    }
}

export default startStopChrono;