import { CompanionConfigField, CompanionInputFieldStaticText, type SomeCompanionConfigField } from '@companion-module/base'
import { ModuleInstance } from './main.js';
export interface ModuleConfig {}

export const GetConfigFields = (self: ModuleInstance): SomeCompanionConfigField[] => {
	var out: SomeCompanionConfigField[] = [];

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