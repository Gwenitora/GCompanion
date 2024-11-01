import { type SomeCompanionConfigField } from '@companion-module/base'
export interface ModuleConfig {
	host: string
	port: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return []
}
