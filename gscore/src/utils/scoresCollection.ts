import { calculateProgression, evaluateExpression, lerp } from './utils.js';
import VariablesCtrl from './variables.js'

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
    private sigmoideCoeff: number;

    public set TransiLenght(value: number) { this.transiLenght = isNaN(value) ? 0 : value; }
    public set Regex(value: string) { this.regex = value; }
    public set Digits(value: number) { this.digits = isNaN(value) ? 0 : value; }
    public set SigmoideCoeff(value: number) { this.sigmoideCoeff = isNaN(value) ? 1 : value; }

    constructor(name: string) {
        this.name = name;
        this.startTimestamp = 0;
        this.regex = "#pts";
        this.transiLenght = 0;
        this.score = 0;
        this.target = 0;
        this.digits = 0;
        this.sigmoideCoeff = .9;

        VariablesCtrl.set(this.name, "");
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
        const dtime = NOW - this.startTimestamp;
        if (dtime < this.transiLenght) {
            this.score = lerp(this.score, this.target, calculateProgression((dtime / this.transiLenght), this.sigmoideCoeff));
        } else {
            this.score = this.target;
        }
        this.setVariable();
    }

    private setVariable(): void {
        var reg = this.regex.split('');
        for (let i = 0; i < reg.length; i++) {
            if (reg[i] === '#') {
                reg[i] = this.score.toFixed(this.digits);
                continue;
            }
            if (reg[i] === '\\') {
                reg[i] = '';
                i++;
            }
        }        
        VariablesCtrl.set(this.name, reg.join(''));
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
}

class ScroresCollection {
    private scores: { [key: string]: Score };

    constructor() {
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