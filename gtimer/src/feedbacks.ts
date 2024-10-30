import { combineRgb } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import ChronosColl from './chronosCollection.js';

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		isStart: {
			name: 'Chrono running',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'name',
					type: 'textinput',
					useVariables: true,
					label: 'Chrono name',
					default: 'Default'
				}
			],
			callback: async (feedback) => {
				return ChronosColl.getChrono((await self.parseVariablesInString(feedback.options.name as string)).replaceAll('-', '_').replaceAll(' ', '_')).IsStarted;
			}
		},
		isPause: {
			name: 'Chrono paused',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 82, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'name',
					type: 'textinput',
					useVariables: true,
					label: 'Chrono name',
					default: 'Default'
				}
			],
			callback: async (feedback) => {
				return ChronosColl.getChrono((await self.parseVariablesInString(feedback.options.name as string)).replaceAll('-', '_').replaceAll(' ', '_')).IsPaused;
			}
		},
	})
}
