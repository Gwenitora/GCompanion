import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import VariablesCtrl from './utils/variables.js'
import { UpgradeScripts } from './upgrades.js'
import ActionManager from './managers/actionManager.js'
import FeedbackManager from './managers/feedbackManager.js'
import PresetManager from './managers/presetManager.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig // Setup in init()

	public static self: ModuleInstance;

	constructor(internal: unknown) {
		super(internal);
		if (!this.config) {
			this.config = {}
		}
		VariablesCtrl.InitModuleDef(this);
	}

	async init(config: ModuleConfig): Promise<void> {
		ModuleInstance.self = this;
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
			.updateFeedbacks() // export feedbacks
			.updatePresets() // export presets
			.updateVariableDefinitions() // export variable definitions
	}
	// When module gets deleted
	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields() {
		return GetConfigFields(this)
	}

	updateActions(): ModuleInstance {
		ActionManager.init().UpdateActions(this)
		return this
	}

	updateFeedbacks(): ModuleInstance {
		FeedbackManager.init().UpdateFeedbacks(this)
		return this
	}

	updatePresets(): ModuleInstance {
		PresetManager.init().UpdatePresets(this)
		return this
	}

	updateVariableDefinitions(): ModuleInstance {
		VariablesCtrl.UpdateVariableDefinitions()
		return this
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
