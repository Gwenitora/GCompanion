import type { ModuleInstance } from '../main.js'

export enum VarDef {
}

class VariablesControl {
	private self?: ModuleInstance;
	private vars: { [key in VarDef | string]: string };

	public get Self(): ModuleInstance | undefined { return this.self; }

	constructor() {
		this.vars = {} as { [key in VarDef]: string };
	}

	public Interval(): void {
		this.UpdateVariableValues();
		this.self?.checkFeedbacks();
	}

	public InitModuleDef(self: ModuleInstance): void {
		this.self = self;

		this.Interval();
		setInterval(() => {this.Interval()}, 42);
	}

	private def: {variableId: string, name: string}[] = [
	]

	//region Global methods
	public get(key: VarDef | string): string {
		if (typeof key !== 'string') {
			key = VarDef[key];
		}
		return this.vars[key];
	}
	
	public set(key: VarDef | string, value: string): void {
		if (typeof key !== 'string') {
			key = VarDef[key];
		}
		this.vars[key] = value;
		if (this.def.find((def) => def.variableId === key) === undefined) {
			this.def.push({
				variableId: key,
				name: ``
			});
			this.UpdateVariableDefinitions();
		}
		this.UpdateVariableValues();
	}

	public del(key: VarDef | string, update: boolean = true): void {
		if (typeof key !== 'string') {
			key = VarDef[key];
		}
		delete this.vars[key];
		const index = this.def.findIndex((def) => def.variableId === key);
		if (index !== -1) {
			this.def.splice(index, 1);
			if (update) this.UpdateVariableDefinitions();
		}
		if (update) this.UpdateVariableValues();
	}

	public UpdateVariableDefinitions(): void {
		this.self?.setVariableDefinitions(this.def);
	}

	private UpdateVariableValues(): void {
		const values = {} as { [key in string]: string };
		for (const key in this.vars) {
			values[key] = this.vars[key];
		}
		this.self?.setVariableValues(values);
	}
	//endregion
}

const VariablesCtrl = new VariablesControl();
export default VariablesCtrl;