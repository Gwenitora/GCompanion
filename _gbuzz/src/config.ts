import { CompanionConfigField, CompanionInputFieldStaticText, type SomeCompanionConfigField } from '@companion-module/base'
import { ModuleInstance } from './main.js';
import physiqueBuzzers from './utils/buzzers/physiqueBuzzers.js';
export interface ModuleConfig {
	[ key: `deviceEnable_${string}`           ]: undefined | boolean;
	[ key: `device_${string}`                 ]: undefined | string;
	[ key: `buzzerEnable_${string}_${string}` ]: undefined | boolean;
	[ key: `buzzer_${string}_${string}`       ]: undefined | string;
	[ key: `buzzerTeam_${string}_${string}`   ]: undefined | string;
	[ key: `buzzerTags_${string}_${string}`   ]: undefined | string[];
	[ key: `tag_${number}`                    ]: undefined | string;
	       'tags'                              : undefined | string;
}

export const GetConfigFields = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [];

	out.push(...GetConfigFieldsPBuzzers(self));
	out.push(GenerateSeperation());
	out.push(...GetConfigFieldsTags(self));

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

const GetConfigFieldsPBuzzers = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [];

	out.push({
		type: 'static-text',
		id: 'LabelPBuzzers',
		label: '',
		width: 12,
		value: `<h2>Physical buzzers</h2>`
	});

	const tags = GetAllTags(self).map(e => ({id: e, label: e}));
	var buzzers = physiqueBuzzers.updateDevices();
	buzzers.sort((a, b) => (a.DeviceId.localeCompare(b.DeviceId)) * 100 + (a.Id - b.Id) * 0.25);

	var lastDeviceId = "{}";
	var isFirstWithId = true;

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

		if (self.config[`deviceEnable_${lastDeviceId}`] === false) continue;

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
			choices: tags
		});
	}

	return out;
};

const GetConfigFieldsTags = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [];
	var OUT: SomeCompanionConfigField[] = [];

	out.push({
		type: 'static-text',
		id: 'LabelTags',
		label: '',
		width: 12,
		value: `<h2>Tags</h2>`
	});

	const tags = GetAllTags(self);

	let i;
	for (i = 0; i < tags.length; i++) {
		OUT.push({
			type: 'static-text',
			id: `tag_${i}`,
			label: '',
			width: 1,
			value: `${self.config[`tag_${i}`]}`
		})
	}
	out.push({
		type: 'textinput',
		id: 'tags',
		label: 'To add tags, enter here, and separate all new by a comma',
		width: 12,
		default: ''
	})
	out.push(...OUT)

	return out;
}

const GetAllTags = (self: ModuleInstance): string[] => {
	var list: string[] = [];

	const tagsKeys = Object.keys(self.config).filter(e => /^tag_\d+$/.test(e) || e === 'tags')
	const tags = tagsKeys.map(e => parseInt(e.slice(4)));
	list.push(...(self.config[`tags`] ? self.config[`tags`] as string : '').replaceAll("  ", " ").replaceAll("__", "_").replaceAll(", ", ",").replaceAll(" ", "_").split(','));
	list = list.map(e => e.trim().toUpperCase());
	list = list.map((e, i) => i === list.indexOf(e) ? e : "");

	for (let i = 0; i <= Math.max(...tags); i++) {
		try {
			delete self.config[`tag_${i}`];
		} catch (e) {}
	}

	list = list.filter(e => e !== '');
	self.config.tags = list.join(', ')
	self.saveConfig(self.config)

	list = list.sort((a, b) => a.localeCompare(b))
	return list;
}