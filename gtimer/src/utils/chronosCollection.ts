import VariablesCtrl from './variables.js'
import gtools from '@gscript/gtools';
const { maths } = gtools;

class Chrono {
    private name: string;
    private startTimestamp: number;
    private lastTimestamp: number;
    private pausedDecal: number;
    private lenght: number;
    private regex: string;
    private regexEnd: string;
    private sens: "up" | "down";
    private isPaused: boolean;
    private isStarted: boolean;
    private resetOnEnd: boolean;
    private instances: string[] = [];
    private removeTimers: {[key in string]: NodeJS.Timeout} = {};

    public get IsPaused(): boolean { return this.isPaused; }
    public get IsStarted(): boolean { return this.isStarted; }
    public set ResetOnEnd(value: boolean) { this.resetOnEnd = value; }
    public set CountDown(value: boolean) {this.sens = value ? "down" : "up";}
    public set Lenght(value: number) { this.lenght = isNaN(value) ? 0 : value; }
    public set Regex(value: string) { this.regex = value; }
    public set RegexEnd(value: string) { this.regexEnd = value; }

    constructor(name: string) {
        this.name = name;
        this.startTimestamp = 0;
        this.lastTimestamp = 0;
        this.pausedDecal = 0;
        this.sens = "down";
        this.regex = "$M$:$S";
        this.regexEnd = "$M$:$S";
        this.isPaused = false;
        this.isStarted = false;
        this.resetOnEnd = true;
        this.lenght = 0;

        VariablesCtrl.set(this.name, "");
        VariablesCtrl.set(this.name + '-Seconds', "");
    }

    public Start(): void {
        this.startTimestamp = Date.now() - (Date.now() % 1000);
        this.pausedDecal = 0;
        this.isStarted = true;
    }

    public Stop(): void {
        this.isStarted = false;
        this.isPaused = false;
        if (this.resetOnEnd) {
            this.startTimestamp = 0;
            this.lastTimestamp = 0;
            this.pausedDecal = 0;
        }
    }

    public Pause(): void {
        if (!this.isStarted) return;
        this.isPaused = !this.isPaused;
    }

    public Update(): void {
        const NOW = Date.now();
        const dTime = NOW - this.lastTimestamp;
        this.lastTimestamp = NOW;
        if (this.isPaused || !this.isStarted) {
            this.pausedDecal += dTime;
        }
        if (this.isStarted) {
            if (!this.isPaused) {
                this.pausedDecal = maths.floor(this.pausedDecal / 1000) * 1000;
                if (this.lenght && this.lenght > 0 && NOW - this.startTimestamp - this.pausedDecal > this.lenght * 1000) {
                    this.Stop();
                }
                if (this.sens === "down" && this.lenght && this.lenght <= 0) {
                    this.Stop();
                }
            }
        }
        this.setVariable();
    }

    private setVariable(): void {
        const NOW = Date.now();
        var dTime = NOW - this.startTimestamp - this.pausedDecal;
        if (this.sens === "down" && this.lenght) dTime = (this.lenght + 1) * 1000 - dTime;
        const date = new Date(dTime);
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const hours = maths.floor(date.getTime() / (1000 * 60 * 60));
        const ms = date.getUTCMilliseconds();
        var time = (this.isStarted ? this.regex : this.regexEnd)
            .replaceAll("$h", hours.toString())
            .replaceAll("$H", (hours < 10 ? "0" : "") + hours.toString())
            .replaceAll("$m", minutes.toString())
            .replaceAll("$M", (minutes < 10 ? "0" : "") + minutes.toString())
            .replaceAll("$s", seconds.toString())
            .replaceAll("$S", (seconds < 10 ? "0" : "") + seconds.toString())
            .replaceAll("$:", ((this.isPaused) ||(ms < 500 && this.sens === "up") || (ms >= 500 && this.sens === "down") ? ":" : " "));
        const _time = time;
        time = "";
        for (var i = 0; i < _time.split("$K").length; i++) {
            const t = _time.split("$K")[i];
            for (var j = 0; j < t.split("$k").length; j++) {
                if (j === 0 as any) {
                    time += t.split("$k")[j];
                    continue;
                }
                var T = t.split("$k")[j].split("");
                for (let k = 0; k < T.length; k++) {
                    if (T[k] === '') continue;
                    if ('123456789'.includes(T[k])) break;
                    T[k] = "";
                }
                T = T.join("").split("");
                var edited = true;
                while (edited) {
                    edited = false;
                    for (let k = T.length - 1; k >= 0; k--) {
                        if (T[k] === '') continue;
                        if ('123456789'.includes(T[k]) || (k !== 0 && '0123456789'.includes(T[k-1]))) break;
                        T[k] = "";
                        edited = true;
                    }
                }
                time += T.join("");
            }
        }
        time = (time === "" ? "0" : time)
            .replaceAll("$\\", '$');
        VariablesCtrl.set(this.name, time);
        VariablesCtrl.set(this.name + '-Seconds', maths.floor(date.getTime() / 1000).toString());
    }

    public AddInstance(instance: string): void {
        if (this.instances.includes(instance)) return;
        this.instances.push(instance);
    }

    public RemoveInstance(instance: string): void {
        const index = this.instances.indexOf(instance);
        if (index === -1) return;
        this.instances.splice(index, 1);
        this.removeTimers[instance] = setTimeout(() => {
            if (this.instances.length === 0) {
                ChronosColl.Delete(this.name.split("-")[1]);
            }
        }, 200)
    }
}

class ChronosCollection {
    private chronos: { [key: string]: Chrono };

    constructor() {
        this.chronos = {};
        this.Init();
    }

    private Init(): void {
        setInterval(() => {
            this.Update();
        }, 23);
    }

    public existChrono(key: string): boolean {
        return this.chronos[key] !== undefined;
    }

    public AddChrono(key: string): Chrono {
        if (this.chronos[key] !== undefined) return this.getChrono(key);
        this.chronos[key] = new Chrono(`Chrono-${key}`);
        return this.getChrono(key);
    }

    public getChrono(key: string): Chrono {
        return this.chronos[key];
    }

    public Update(): void {
        for (const key in this.chronos) {
            this.chronos[key].Update();
        }
    }

    public Delete(key: string): void {
        if (this.chronos[key] === undefined) return;
        delete this.chronos[key];
        VariablesCtrl.del(`Chrono-${key}`);
        VariablesCtrl.del(`Chrono-${key}-Seconds`);
    }

    public DeleteAll(): void {
        for (const key in this.chronos) {
            this.Delete(key);
        }
    }
}

const ChronosColl = new ChronosCollection();
export default ChronosColl;