import { CompPresetText } from "../../../managers/presetTemplate.js";
import CompPresetCategories from "../Categories.js";

class VirtualNumbers extends CompPresetText {
    protected id = "virtualNumbers";
    protected text = "";
    protected category = CompPresetCategories.Keys;
    protected name = "Numbers";
}

export default VirtualNumbers;