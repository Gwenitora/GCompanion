import { CompPresetText } from "../../../managers/presetTemplate.js";
import CompPresetCategories from "../Categories.js";

class VirtualMaths extends CompPresetText {
    protected id = "virtualMaths";
    protected text = "";
    protected category = CompPresetCategories.Keys;
    protected name = "Maths";
}

export default VirtualMaths;