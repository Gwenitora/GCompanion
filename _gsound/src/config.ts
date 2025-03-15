import { CompanionConfigField, CompanionInputFieldStaticText, type SomeCompanionConfigField } from '@companion-module/base'
import { ModuleInstance } from './main.js';
import AudioManager from './utils/audio.js';


export interface ModuleConfig {
	VirtualInOutPutLength: number;
	[key: `Virtual${'In' | 'Out'}put${number}`]: string;
}

export const GetConfigFields = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [{
		type: 'number',
		label: 'Virtual Input/Output Length',
		id: 'VirtualInOutPutLength',
		default: 1,
		range: false,
		required: true,
		width: 4,
		min: 0,
	} as SomeCompanionConfigField];

	const inDevices = AudioManager.devices.filter((device) => device.maxInputChannels > 0);
	const outDevices = AudioManager.devices.filter((device) => device.maxOutputChannels > 0);
	
	for (let i = 0; i < self.config.VirtualInOutPutLength; i++) {
		out.push({
			type: 'static-text',
			id: `VirtualInOutPut${i}Text`,
			label: `Virtual Input/Output ${i + 1}`,
			width: 12,
			value: `Virtual Input/Output ${i + 1}`
		});

		out.push({
			type: 'multidropdown' ,
			label: `Input`,
			id: `VirtualInput${i}`,
			default: [],
			width: 6,
			choices: inDevices.map((device) => ({ id: device.id, label: device.name }))
		});

		out.push({
			type: 'multidropdown',
			label: `Output`,
			id: `VirtualOutput${i}`,
			default: [0],
			width: 6,
			choices: outDevices.map((device) => ({ id: device.id, label: device.name })),
			minSelection: 1
		});
	}

	return out;
}

var sep = -1;
const GenerateSeperation = (): CompanionInputFieldStaticText & CompanionConfigField => {
	sep++;
	return {
		type: 'static-text',
		id: 'seperator_' + sep,
		label: '',
		width: 12,
		value: '<hr />'
	}
}