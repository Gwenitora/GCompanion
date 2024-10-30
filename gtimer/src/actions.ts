import ChronosColl from './chronosCollection.js'
import type { ModuleInstance } from './main.js'

export function UpdateActions(self: ModuleInstance): void {
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
					id: 'lenght',
					type: 'textinput',
					useVariables: true,
					label: 'Lenght (in seconds, 0 in countup for infinite)',
					default: '0'
				},
				{
					id: 'countdown',
					type: 'checkbox',
					label: 'Countdown',
					default: false
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
			],
			callback: async (event) => {
				const ch = ChronosColl.AddChrono((await self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').replaceAll(' ', '_'));
				ch.CountDown = event.options.countdown as boolean;
				ch.ResetOnEnd = event.options.reset as boolean;
				ch.Lenght = parseFloat(await self.parseVariablesInString(event.options.lenght as string));
				ch.Regex = await self.parseVariablesInString(event.options.reg as string);
				ch.RegexEnd = await self.parseVariablesInString(event.options.regEnd as string);
				console.log('DetectHere', await self.parseVariablesInString(event.options.name as string));
				if (!ch.IsStarted) {
					ch.Start();
				} else {
					ch.Stop();
				}
			},
			subscribe: async (event) => {
				const ch = ChronosColl.AddChrono((await self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').replaceAll(' ', '_'));
				ch.ResetOnEnd = event.options.reset as boolean;
				ch.Regex = await self.parseVariablesInString(event.options.reg as string);
				ch.RegexEnd = await self.parseVariablesInString(event.options.regEnd as string);
				ch.AddInstance(event.id);
			},
			unsubscribe: async (event) => {
				const ch = ChronosColl.getChrono((await self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').replaceAll(' ', '_'));
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
				const ch = ChronosColl.getChrono((await self.parseVariablesInString(event.options.name as string)).replaceAll('-', '_').replaceAll(' ', '_'));
				ch.Pause();
			},
		}
	})
}
