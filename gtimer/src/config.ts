import { type SomeCompanionConfigField } from '@companion-module/base'
import { ModuleInstance } from './main.js';
export interface ModuleConfig {}

export function GetConfigFields(self: ModuleInstance): SomeCompanionConfigField[] {
	var out: SomeCompanionConfigField[] = [];

	self;

	return out;
}
