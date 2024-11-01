import { combineRgb } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import ChronosColl from './utils/chronosCollection.js';
import dataLink from './utils/dataLink.js';

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
			callback: (feedback) => {
				try {
					return ChronosColl.getChrono(dataLink.getDatas(feedback.id)).IsStarted;
				} catch (e) {
					return false;
				}
			},
			subscribe: async (feedback) => {
				dataLink.setDatas(feedback.id, (await self.parseVariablesInString(feedback.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
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
			callback: (feedback) => {
				try {
					return ChronosColl.getChrono(dataLink.getDatas(feedback.id)).IsPaused;
				} catch (e) {
					return false;
				}
			},
			subscribe: async (feedback) => {
				dataLink.setDatas(feedback.id, (await self.parseVariablesInString(feedback.options.name as string)).replaceAll('-', '_').trim().replaceAll(' ', '_'));
			}
		},
	})
}
