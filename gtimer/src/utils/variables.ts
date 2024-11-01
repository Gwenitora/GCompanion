import type { ModuleInstance } from '../main.js'
import { getWeekNumber } from './utils.js';

export enum VarDef {
	Time,

	Time_Hour,
	Time_Minute,
	Time_Second,

	Date_Day,
	Date_Year,

	Date_Month,
	Date_MonthName,

	Date_Week,
	Date_WeekDay,

	Info_ClintPoints,
	Info_Timestamp,

	Format_Default,
	Format_Empty,
	Format_NoZero,
	Format_WithHour,
	Format_WithHourNoZero
}

class VariablesControl {
	private self?: ModuleInstance;
	private vars: { [key in VarDef | string]: string };

	public get Self(): ModuleInstance | undefined { return this.self; }

	constructor() {
		this.vars = {} as { [key in VarDef]: string };
	}

	public Interval(): void {
		const NOW = new Date(Date.now());
		this.set(VarDef.Time, NOW.toLocaleString());
		this.set(VarDef.Time_Hour, (NOW.getHours() < 10 ? '0' : '') + NOW.getHours().toString());
		this.set(VarDef.Time_Minute, (NOW.getMinutes() < 10 ? '0' : '') + NOW.getMinutes().toString());
		this.set(VarDef.Time_Second, (NOW.getSeconds() < 10 ? '0' : '') + NOW.getSeconds().toString());
		this.set(VarDef.Date_Day, (NOW.getDate() < 10 ? '0' : '') + NOW.getDate().toString());
		this.set(VarDef.Date_Year, (NOW.getFullYear() < 10 ? '0' : '') + NOW.getFullYear().toString());
		this.set(VarDef.Date_Month, (NOW.getMonth() < 10 ? '0' : '') + NOW.getMonth().toString());
		this.set(VarDef.Date_MonthName, NOW.toLocaleString('default', { month: 'long' }));
		this.set(VarDef.Date_Week, getWeekNumber(NOW).toString());
		this.set(VarDef.Date_WeekDay, NOW.toLocaleString('default', { weekday: 'long' }));
		this.set(VarDef.Info_ClintPoints, NOW.getMilliseconds() < 500 ? ':' : ' ');
		this.set(VarDef.Info_Timestamp, NOW.getTime().toString());
		this.UpdateVariableValues();
		this.self?.checkFeedbacks();
	}

	private def = [
		{
			variableId: VarDef[VarDef.Time],
			name: 'Current time at format: \'dd/mm/yyyy hh:mm:ss\''
		},
		{
			variableId: VarDef[VarDef.Time_Hour],
			name: 'Current hour'
		},
		{
			variableId: VarDef[VarDef.Time_Minute],
			name: 'Current minute'
		},
		{
			variableId: VarDef[VarDef.Time_Second],
			name: 'Current second'
		},
		{
			variableId: VarDef[VarDef.Date_Day],
			name: 'Current day'
		},
		{
			variableId: VarDef[VarDef.Date_Year],
			name: 'Current year'
		},
		{
			variableId: VarDef[VarDef.Date_Month],
			name: 'Current month'
		},
		{
			variableId: VarDef[VarDef.Date_MonthName],
			name: 'Current month name'
		},
		{
			variableId: VarDef[VarDef.Date_Week],
			name: 'Current week'
		},
		{
			variableId: VarDef[VarDef.Date_WeekDay],
			name: 'Current week day'
		},
		{
			variableId: VarDef[VarDef.Info_ClintPoints],
			name: 'To clint 2 point synk with time'
		},
		{
			variableId: VarDef[VarDef.Info_Timestamp],
			name: 'Current timestamp'
		},
		{
			variableId: VarDef[VarDef.Format_Default],
			name: 'Default format: \'mm:ss\''
		},
		{
			variableId: VarDef[VarDef.Format_Empty],
			name: 'Empty format: \'0\''
		},
		{
			variableId: VarDef[VarDef.Format_NoZero],
			name: 'No zero format: \'16:34\' or \'18\''
		},
		{
			variableId: VarDef[VarDef.Format_WithHour],
			name: 'With hour format: \'hh:mm:ss\''
		},
		{
			variableId: VarDef[VarDef.Format_WithHourNoZero],
			name: 'With hour no zero format: \'7:55:05\' or \'42:29\' or \'8\''
		}
	]

	public InitModuleDef(self: ModuleInstance): void {
		this.self = self;

		this.set(VarDef.Format_Default, '$M$:$S');
		this.set(VarDef.Format_Empty, '0');
		this.set(VarDef.Format_NoZero, '$k$M$:$S');
		this.set(VarDef.Format_WithHour, '$H$:$M$:$S');
		this.set(VarDef.Format_WithHourNoZero, '$k$H$:$M$:$S');

		this.Interval();
		setInterval(() => {this.Interval()}, 42);
	}

	//region Global methods
	public get(key: VarDef | string): string {
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