import { CompanionConfigField, CompanionInputFieldStaticText, DropdownChoice, type SomeCompanionConfigField } from '@companion-module/base'
import { ModuleInstance } from './main.js';
import physiqueBuzzers from './utils/buzzers/physiqueBuzzers.js';
import Gamemodes from './utils/mode.js';
import buzzersManager from './utils/buzzers/buzzersManager.js';
import GameModes from './utils/mode.js';
export interface ModuleConfig {
	[ key: `deviceEnable_${string}`           ]: undefined | boolean;
	[ key: `device_${string}`                 ]: undefined | string;
	[ key: `buzzerEnable_${string}p${number}` ]: undefined | boolean;
	[ key: `buzzer_${string}p${number}`       ]: undefined | string;
	[ key: `buzzerTeam_${string}p${number}`   ]: undefined | string;
	[ key: `buzzerTags_${string}p${number}`   ]: undefined | string[];
	[ key: `tag_${number}`                    ]: undefined | string;
	       'tags'                              : undefined | string;
	       'Gamemode'                          : undefined | number;
	       'canBuzz'                           : undefined | number;
	       'activateAnswers'                   : undefined | number[];
}

export const GetConfigFields = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [];

	buzzersManager.updatePhysicalBuzzers();
	out.push(...GetConfigFieldsGamemode(self));
	out.push(GenerateSeperation());
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
	var buzzers = physiqueBuzzers.Buzzers;
	buzzers.sort((a, b) => (a.DeviceId.localeCompare(b.DeviceId)) * 100 + (a.Id - b.Id) * 0.25);

	var lastDeviceId = "{}";
	var isFirstWithId = true;

	var connectedBuzzers: string[] = [];

	for (const buzzer of buzzers) {
		isFirstWithId = false;

		if (buzzer.DeviceId.indexOf(lastDeviceId) < 0) {
			lastDeviceId = buzzer.DeviceId.replaceAll('{', '').replaceAll('}', '');
			isFirstWithId = true;
			connectedBuzzers.push(`device_${lastDeviceId}`);
			
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

		out.push({
			type: 'static-text',
			id: 'buzzerLabel_' + buzzer.UID,
			label: '',
			width: 1,
			value: '' + buzzer.Id,
			isVisible: (event, data) => { return event[data] as any },
			isVisibleData: `deviceEnable_${lastDeviceId}`
		});
		out.push({
			type: 'checkbox',
			id: 'buzzerEnable_' + buzzer.UID,
			label: '',
			width: 1,
			default: true,
			isVisible: (event, data) => { return event[data] as any },
			isVisibleData: `deviceEnable_${lastDeviceId}`
		});
		out.push({
			type: 'textinput',
			id: 'buzzer_' + buzzer.UID,
			label: isFirstWithId ? 'Name' : '',
			width: 4,
			default: 'Buzzer ' + buzzer.Id,
			isVisible: (event, data) => { return event[data] as any },
			isVisibleData: `deviceEnable_${lastDeviceId}`
		});
		out.push({
			type: 'textinput',
			id: 'buzzerTeam_' + buzzer.UID,
			label: isFirstWithId ? 'Team name' : '',
			width: 4,
			default: '',
			isVisible: (event, data) => { return event[data] as any },
			isVisibleData: `deviceEnable_${lastDeviceId}`
		});
		out.push({
			type: 'multidropdown',
			id: 'buzzerTags_' + buzzer.UID,
			label: isFirstWithId ? 'Tags' : '',
			width: 2,
			default: [],
			choices: tags,
			isVisible: (event, data) => { return event[data] as any },
			isVisibleData: `deviceEnable_${lastDeviceId}`
		});
	}

	var nonConnectedBuzzersValues: string[] = Object.keys(self.config).filter(e => /^device_(.+)$/.test(e) && !connectedBuzzers.includes(e)).filter(e => self.config[e as `device_${string}`] !== undefined);
	if (nonConnectedBuzzersValues.length === 0) return out;
	var nonConnectedBuzzers: string[] = nonConnectedBuzzersValues.map(e => self.config[e as `device_${string}`]).filter(e => e !== undefined);
	nonConnectedBuzzersValues = nonConnectedBuzzersValues.map(e => e.replace('device_', ''))

	out.push({
		type: 'static-text',
		id: 'LabelPBuzzersNC',
		label: '',
		width: 12,
		value: `<h5>Disconnected buzzers</h5>`
	});

	for (let i = 0; i < nonConnectedBuzzers.length; i++) {
		out.push({
			type: 'static-text',
			id: 'LabelPBuzzerNC_' + nonConnectedBuzzersValues[i],
			label: nonConnectedBuzzersValues[i].slice(0, 9) + '..',
			width: 3,
			value: nonConnectedBuzzers[i]
		});
	}

	return out;
};

const GetConfigFieldsGamemode = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [];

	out.push({
		type: 'static-text',
		id: 'LabelGamemode',
		label: '',
		width: 12,
		value: `<h2>Gamemode</h2>`
	});

	var choices: DropdownChoice[] = [];
	for (const mode in Gamemodes) {
		if (isNaN(parseInt(mode))) {
			choices.push({
				id: Gamemodes[mode],
				label: mode
			})
		}
	}

	out.push({
		type: 'dropdown',
		id: 'Gamemode',
		choices: choices,
		default: Gamemodes.OFF,
		label: '',
		width: 12
	});

	out.push({
		type: 'number',
		id: 'canBuzz',
		label: 'Number of poeple can buzz in maximum',
		default: 1,
		min: 0,
		max: 999_999_999_999_999_999_999,
		width: 6,
		isVisible: (event, data) => {return event.Gamemode === data},
		isVisibleData: GameModes.SPEED
	});

	// activateAnswers

	return out;
}

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
	self.saveConf()

	list = list.sort((a, b) => a.localeCompare(b))
	return list;
}