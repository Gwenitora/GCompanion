import { CompanionPresetDefinitions } from "@companion-module/base";
import { ModuleInstance } from "../main.js";
import setupPresets from "../companion/presetsList.js";
import CompanionPreset, { CompanionPresetButton, CompanionPresetText } from "./presetTemplate.js";
import { CompanionPresetAction } from "./presetContainers.js";

class CompanionPresetManager {
    private presets: CompanionPreset[] = [];
    private companionPresets: CompanionPresetDefinitions = {};

    public addPreset(preset: CompanionPreset): CompanionPresetManager {
        this.presets.push(preset);
        if (preset.Type == "button") {
            const Preset: CompanionPresetButton = preset as CompanionPresetButton;
            this.companionPresets[Preset.Id] = {
                category: Preset.Category,
                feedbacks: Preset.FeedBacks.map((feedback) => {
                    return {
                        feedbackId: feedback.FeedBack.Id,
                        options: feedback.Options,
                        style: feedback.Style,
                        headline: feedback.Description,
                        isInverted: feedback.IsInverted
                    };
                }),
                name: Preset.Name,
                steps: Preset.Steps.map((step) => {
                    const transf = (action: CompanionPresetAction) => {
                        return {
                            actionId: action.Action.Id,
                            options: action.Options,
                            delay: action.Delay
                        };
                    }
                    return {
                        name: step.Name,
                        down: step.OnClick.map(transf),
                        up: step.OnRelease.map(transf),
                        rotate_left: step.OnRotateLeft.map(transf),
                        rotate_right: step.OnRotateRight.map(transf)
                    }
                }),
                style: Preset.Style,
                type: preset.Type,
                options: Preset.Options,
                previewStyle: Preset.PreviewStyle
            };
        } else {
            const Preset: CompanionPresetText = preset as CompanionPresetText;
            this.companionPresets[Preset.Id] = {
                category: Preset.Category,
                name: Preset.Name,
                text: Preset.Text,
                type: preset.Type
            };
        }
        return this;
    }

    public init(): CompanionPresetManager {
        this.presets = [];
        this.companionPresets = {};
        setupPresets();
        return this;
    }

    public UpdatePresets(self: ModuleInstance): void {
        for (const i in this.companionPresets) {
            const r: [string, string] = ["$(?:", `$(${self.id}:`];

            if (!this.companionPresets[i]) continue;
            this.companionPresets[i].name = this.companionPresets[i].name.replaceAll(...r);

            if (this.companionPresets[i].type !== 'button') {
                this.companionPresets[i].text = this.companionPresets[i].text?.replaceAll(...r);
                continue;
            }

            this.companionPresets[i].feedbacks.forEach(feedback => {
                feedback.headline = feedback.headline?.replaceAll(...r);
                if (!feedback.style) return;
                    feedback.style.text = feedback.style.text?.replaceAll(...r);
            });

            this.companionPresets[i].steps.forEach(step => {
                step.name = step.name?.replaceAll(...r);

                step.down.forEach(action => {
                    if (!action.headline) return;
                    action.headline = action.headline?.replaceAll(...r);
                });
                step.up.forEach(action => {
                    if (!action.headline) return;
                    action.headline = action.headline?.replaceAll(...r);
                });
                step.rotate_left?.forEach(action => {
                    if (!action.headline) return;
                    action.headline = action.headline?.replaceAll(...r);
                });
                step.rotate_right?.forEach(action => {
                    if (!action.headline) return;
                    action.headline = action.headline?.replaceAll(...r);
                });
            });

            if (this.companionPresets[i].previewStyle) {
                this.companionPresets[i].previewStyle.text = this.companionPresets[i].previewStyle.text?.replaceAll(...r);
            }
            if (this.companionPresets[i].style) {
                this.companionPresets[i].style.text = this.companionPresets[i].style.text?.replaceAll(...r);
            }
        }
        
        self.setPresetDefinitions(this.companionPresets);
    }
}

const PresetManager = new CompanionPresetManager();
export default PresetManager;