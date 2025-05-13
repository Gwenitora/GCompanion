import EventManager from "../events.js";

export type qtBoolean = [boolean, boolean, boolean, boolean, boolean];
export enum buzzerType {
    Physical,
    Virtual
}

abstract class Buzzer {
    protected onChange = new EventManager<(state: qtBoolean, isDifferent: qtBoolean) => void>();
    public onBuzz = new EventManager<(state: boolean) => void>();
    public onBuzzPressed = new EventManager<() => void>();
    public onBuzzRelease = new EventManager<() => void>();
    public onAnswer = new EventManager<(state: boolean, answer: 1 | 2 | 3 | 4) => void>();
    public onAnswerPressed = new EventManager<(answer: 1 | 2 | 3 | 4) => void>();
    public onAnswerRelease = new EventManager<(answer: 1 | 2 | 3 | 4) => void>();
    public onButton = new EventManager<(state: boolean, button: 0 | 1 | 2 | 3 | 4) => void>();
    public onButtonPressed = new EventManager<(button: 0 | 1 | 2 | 3 | 4) => void>();
    public onButtonRelease = new EventManager<(button: 0 | 1 | 2 | 3 | 4) => void>();

    private type: buzzerType;
    private state: boolean = false;
    private uid: string = "";

    get Type() { return this.type }
    get State() { return this.state; }
    public get UID() { return this.uid }
    protected set State(state: boolean) { this.state = state; }
    protected set UID(UID: string) { this.uid = UID; }

    constructor(type: buzzerType, id: number = 0) {
        this.type = type;

        setTimeout(() => {
            this.setLight(true);
            setTimeout(() => {
                this.setLight(false);
            }, 200);
        }, 1000 + 75 * id);
    }
    public abstract setLight(state: boolean): void;
    protected prepareEvents() {
        // buzzer button
        this.onChange.on((state, isDifferent) => {
            if (isDifferent[0]) {
                this.onBuzz.invoke(state[0]);
                this.onButton.invoke(state[0], 0);
            }
        });
        this.onBuzz.on((state) => {
            (state ? this.onBuzzPressed : this.onBuzzRelease).invoke();
        });

        // answer buttons
        this.onChange.on((state, isDifferent) => {
            for (let i = 1; i < 5; i++) {
                if (isDifferent[i]) {
                    this.onAnswer.invoke(state[i], i as 1 | 2 | 3 | 4);
                    this.onButton.invoke(state[i], i as 1 | 2 | 3 | 4);
                }
            }
        });
        this.onAnswer.on((state, answer) => {
            (state ? this.onAnswerPressed : this.onAnswerRelease).invoke(answer);
        });

        // button event
        this.onButton.on((state, button) => {
            (state ? this.onButtonPressed : this.onButtonRelease).invoke(button);
        });
    }
}

export default Buzzer;