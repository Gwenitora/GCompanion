import { Easing } from './easing.js';
import { evaluateExpression, lerp } from './utils.js';
import VariablesCtrl, { VarDef } from './variables.js'

class Score {
    private name: string;
    private startTimestamp: number;
    private transiLenght: number;
    private regex: string;
    private instances: string[] = [];
    private removeTimers: {[key in string]: NodeJS.Timeout} = {};
    private score: number;
    private target: number;
    private digits: number;
    private easing: {algo: Easing.algorithm, type: Easing.curve};

    public set TransiLenght(value: number) { this.transiLenght = isNaN(value) ? 0 : value; }
    public set Regex(value: string) { this.regex = value; }
    public set Digits(value: number) { this.digits = isNaN(value) ? 0 : value; }
    public set EasingAlgo(algo: Easing.algorithm) { this.easing.algo = algo; }
    public set EasingType(type: Easing.curve) { this.easing.type = type; }

    constructor(name: string) {
        this.name = name;
        this.startTimestamp = 0;
        this.regex = "#pts";
        this.transiLenght = 0;
        this.score = 0;
        this.target = 0;
        this.digits = 0;
        this.easing = {algo: 'linear', type: 'ease-in'};

        this.setVariable(0, this.name);
        this.setVariable(0, this.name + '-target');
    }

    public setScore(value: number | string): void {
        if (typeof value === 'string') {
            value = evaluateExpression(value);
            value = isNaN(value) ? 0 : value;
        }
        this.target = value;
        this.startTimestamp = Date.now();
        if (this.transiLenght === 0) {
            this.score = this.target;
        }
    }

    public Update(): void {
        const NOW = Date.now();
        const dtime = (NOW - this.startTimestamp) * ScoreColl.TimeScale;
        if (dtime < this.transiLenght) {
            this.score = lerp(this.score, this.target, this.transiLenght === 0 ? 0 : Easing.getEasing(this.easing.algo, this.easing.type)(dtime / this.transiLenght));
        } else {
            this.score = this.target;
        }
        this.setVariable(this.score, this.name);
        this.setVariable(this.target, this.name + '-target');
    }

    private setVariable(variable: number, name: string): void {
        var reg = this.regex.split('');
        for (let i = 0; i < reg.length; i++) {
            if (reg[i] === '#') {
                reg[i] = variable.toFixed(this.digits);
                continue;
            }
            if (reg[i] === '\\') {
                reg[i] = '';
                i++;
            }
        }
        VariablesCtrl.set(name, reg.join(''));
    }

    public addInstance(instance: string): void {
        if (this.instances.includes(instance)) return;
        this.instances.push(instance);
    }

    public RemoveInstance(instance: string): void {
        const index = this.instances.indexOf(instance);
        if (index === -1) return;
        this.instances.splice(index, 1);
        this.removeTimers[instance] = setTimeout(() => {
            if (this.instances.length === 0) {
                ScoreColl.Delete(this.name.split("-")[1]);
            }
        }, 50)
    }

    public resetStartTimestamp(lastScale: number, futurScale: number): void {
        if (futurScale === 0) {
            this.startTimestamp = 0;
        } else if (lastScale === 0) {
            this.startTimestamp = Date.now();
        } else {
            this.startTimestamp = Date.now() - ((Date.now() - this.startTimestamp) * lastScale / futurScale);
        }
    }
}

class ScroresCollection {
    private scores: { [key: string]: Score };
    private timeScale: number;

    get TimeScale(): number {
        return this.timeScale;
    }
    set TimeScale(value: number) {
        for (const key in this.scores) {
            this.scores[key].resetStartTimestamp(this.timeScale, value);
        }
        this.timeScale = value;
        VariablesCtrl.set(VarDef.TimeScale, this.timeScale.toString());
    }

    constructor() {
        this.timeScale = 1;
        this.scores = {};
        this.Init();
    }

    private Init(): void {
        setInterval(() => {
            this.Update();
        }, 23);
    }

    public ExistScore(key: string): boolean {
        return this.scores[key] !== undefined;
    }

    public addScore(key: string): Score {
        if (this.scores[key] !== undefined) return this.getScore(key);
        this.scores[key] = new Score(`Score-${key}`);
        return this.getScore(key);
    }

    public getScore(key: string): Score {
        return this.scores[key];
    }

    public Update(): void {
        for (const key in this.scores) {
            this.scores[key].Update();
        }
    }

    public Delete(key: string): void {
        if (this.scores[key] === undefined) return;
        VariablesCtrl.del(`Score-${key}`);
        VariablesCtrl.del(`Score-${key}-target`);
        delete this.scores[key];
    }

    public DeleteAll(): void {
        for (const key in this.scores) {
            this.Delete(key);
        }
    }
}

const ScoreColl = new ScroresCollection();
export default ScoreColl;