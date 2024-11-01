import { CompanionActionEvent, CompanionActionInfo } from '@companion-module/base/dist/index.js';
import ChronosColl from './chronosCollection.js'
import type { ModuleInstance } from './main.js'
import { evaluateExpression } from './utils.js';
import gtools from '@gscript/gtools';
import dataLink from './dataLink.js';
const { maths } = gtools;

export function UpdateActions(self: ModuleInstance): void {

	async function updateDatasChrono(ch: any, event: CompanionActionEvent | CompanionActionInfo) {ch.CountDown = event.options.countdown as boolean;
		ch.ResetOnEnd = event.options.reset as boolean;
		var hou = evaluateExpression(await self.parseVariablesInString(event.options.hou as string));
		var min = evaluateExpression(await self.parseVariablesInString(event.options.min as string));
		var sec = evaluateExpression(await self.parseVariablesInString(event.options.sec as string));
		hou = hou ? hou : 0;
		min = min ? min : 0;
		sec = sec ? sec : 0;
		var Lenght = hou * 60 * 60 + min * 60 + sec;
		ch.Lenght = Lenght;
		if (event.options.cmode as boolean) {
			Lenght = maths.mod(Lenght, (24 * 60 * 60));
			const date = new Date(Date.now());
			const now = (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
			Lenght = Lenght - now;
			ch.Lenght = maths.mod(Lenght, (24 * 60 * 60));
		}
		ch.Regex = await self.parseVariablesInString(event.options.reg as string);
		ch.RegexEnd = await self.parseVariablesInString(event.options.regEnd as string);
	}

	self.setActionDefinitions({
		startStopChrono: {
			name: 'Start/Stop Chrono',
			options: [
				{
					id: 'name',
					type: 'textinput',
					useVariables: true,
					label: 'Chrono name',
					default: 'Default'
				},
				{
					id: 'hou',
					type: 'textinput',
					useVariables: true,
					label: 'Hours',
					default: ''
				},
				{
					id: 'min',
					type: 'textinput',
					useVariables: true,
					label: 'Minutes',
					default: ''
				},
				{
					id: 'sec',
					type: 'textinput',
					useVariables: true,
					label: 'Seconds',
					default: '30'
				},
				{
					id: 'cmode',
					type: 'checkbox',
					label: 'Clock mode (get elapsed time between now and target time)',
					default: false
				},
				{
					id: 'countdown',
					type: 'checkbox',
					label: 'Countdown',
					default: true
				},
				{
					id: 'reset',
					type: 'checkbox',
					label: 'Reset on end',
					default: true
				},
				{
					id: 'descriptionFormat',
					type: 'static-text',
					label: 'Format',
					value: (
						'To make a text, just use this text text.\nTo make a variable, use \'$H\', the variable has already 1 character for the name, and the case is important.'+
						'\n- $h -> The hour (ex: 0 | 6 | 21)\n- $H -> The hour in 2 digits (ex: 00 | 06 | 21)'+
						'\n- $m -> The minute (ex: 0 | 6 | 42)\n- $M -> The minute in 2 digits (ex: 00 | 06 | 42)'+
						'\n- $s -> The second (ex: 0 | 6 | 42)\n- $S -> The second in 2 digits (ex: 00 | 06 | 42)'+
						'\n- $: -> A \':\' to clint the : every second'+
						'\n- $\\ -> To keep the $ and don\'t use a variable (ex: $H -> 06 | $\\H -> $H)'+
						'\n- $K -> To no remove text if 0 (is as default) (ex: $K$H:$M:$S -> 00:42:00)'+
						'\n- $k -> To remove text if 0 (ex: $k$H:$M:$S -> 8:00 | $k$H:$M:$K$S -> 8:00 | $k$H:$M$K:$k$S -> 42:)'
					).replaceAll('\n-', '\n•').replaceAll('\n', '<br>')
				},
				{
					id: 'reg',
					type: 'textinput',
					useVariables: true,
					label: 'Format when started',
					default: '$(gtimer:Format_Default)'
				},
				{
					id: 'regEnd',
					type: 'textinput',
					useVariables: true,
					label: 'Format when stopped',
					default: '$(gtimer:Format_Empty)'
				},
				{
					id: 'makeUpdate',
					type: 'checkbox',
					label: 'Update',
					default: false
				}
			],
			callback: async (event) => {
				const ch = ChronosColl.AddChrono((await self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
				await updateDatasChrono(ch, event);
				if (!ch.IsStarted) {
					ch.Start();
				} else {
					ch.Stop();
				}
			},
			subscribe: async (event) => {
				const ch = ChronosColl.AddChrono((await self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
				ch.AddInstance(event.id);

				if (event.options.makeUpdate !== dataLink.getDatas(event.id)) {
					await updateDatasChrono(ch, event);
					dataLink.setDatas(event.id, event.options.makeUpdate)
				}
			},
			unsubscribe: async (event) => {
				const ch = ChronosColl.getChrono((await self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
				ch?.RemoveInstance(event.id);
			},
		},
		pauseChrono: {
			name: 'Pause/Resume Chrono',
			options: [
				{
					id: 'name',
					type: 'textinput',
					useVariables: true,
					label: 'Chrono name',
					default: 'Default'
				},
			],
			callback: async (event) => {
				const ch = ChronosColl.getChrono((await self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
				ch.Pause();
			},
		}
	})
}
