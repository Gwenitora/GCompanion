import { CompanionConfigField, CompanionInputFieldStaticText, type SomeCompanionConfigField } from '@companion-module/base'
import { ModuleInstance } from './main.js';
export interface ModuleConfig {}

export const GetConfigFields = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [];

	out.push(GenerateSeperation())

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