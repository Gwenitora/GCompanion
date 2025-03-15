import { CompanionConfigField, CompanionInputFieldStaticText, type SomeCompanionConfigField } from '@companion-module/base'
import { ModuleInstance } from './main.js';
import physiqueBuzzers from './utils/buzzers/physiqueBuzzers.js';
export interface ModuleConfig {
	[key: `deviceEnable_${string}`]: boolean;
	[key: `device_${string}`]: string;
	[key: `buzzerEnable_${string}_${string}`]: boolean;
	[key: `buzzer_${string}_${string}`]: string;
	[key: `buzzerTeam_${string}_${string}`]: string;
}

export const GetConfigFields = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [];

	out.push(...GetConfigFieldsPBuzzers(self))
	out.push(GenerateSeperation())

	return out;
}

const GenerateSeperation = (): CompanionInputFieldStaticText & CompanionConfigField => {
	return {
		type: 'static-text',
		id: 'seperation_' + Math.floor(Math.random() + 1000000000000000000000000),
		label: '',
		width: 12,
		value: '<hr />'
	}
}

const GetConfigFieldsPBuzzers = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [];

	var buzzers = physiqueBuzzers.updateDevices();
	buzzers.sort((a, b) => (a.DeviceId.localeCompare(b.DeviceId)) * 100 + (a.Id - b.Id) * 0.25);

	var lastDeviceId = "{}";
	var isFirstWithId = true;

	out.push({
		type: 'static-text',
		id: 'LabelPBuzzers',
		label: '',
		width: 12,
		value: `
			<h2>Buzzers physiques</h2>
		`
	});

	for (const buzzer of buzzers) {
		isFirstWithId = false;

		if (buzzer.DeviceId.indexOf(lastDeviceId) < 0) {
			lastDeviceId = buzzer.DeviceId.replaceAll('{', '').replaceAll('}', '');
			isFirstWithId = true;
			
			out.push({
				type: 'checkbox',
				id: 'deviceEnable_' + lastDeviceId,
				label: '',
				width: 1,
				default: true
			});
			out.push({
				type: 'textinput',
				id: 'device_' + lastDeviceId,
				label: 'Device ' + lastDeviceId.slice(0, 9) + '..',
				width: 11,
				default: lastDeviceId
			});
		}

		if (self.config[('deviceEnable_' + lastDeviceId) as `deviceEnable_${string}`] === false) continue;

		out.push({
			type: 'static-text',
			id: 'buzzerLabel_' + lastDeviceId + '_' + buzzer.Id,
			label: '',
			width: 1,
			value: '' + buzzer.Id,
		});
		out.push({
			type: 'checkbox',
			id: 'buzzerEnable_' + lastDeviceId + '_' + buzzer.Id,
			label: '',
			width: 1,
			default: true
		});
		out.push({
			type: 'textinput',
			id: 'buzzer_' + lastDeviceId + '_' + buzzer.Id,
			label: isFirstWithId ? 'Name' : '',
			width: 4,
			default: 'Buzzer ' + buzzer.Id
		});
		out.push({
			type: 'textinput',
			id: 'buzzerTeam_' + lastDeviceId + '_' + buzzer.Id,
			label: isFirstWithId ? 'Team name' : '',
			width: 4,
			default: ''
		});
		out.push({
			type: 'multidropdown',
			id: 'buzzerTags_' + lastDeviceId + '_' + buzzer.Id,
			label: isFirstWithId ? 'Tags' : '',
			width: 2,
			default: [],
			choices: []
		});
	}

	return out;
};