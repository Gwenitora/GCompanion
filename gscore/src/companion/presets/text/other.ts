import { CompPresetText } from "../../../managers/presetTemplate.js";
import CompPresetCategories from "../Categories.js";

class VirtualOthers extends CompPresetText {
    protected id = "virtualOthers";
    protected text = "";
    protected category = CompPresetCategories.Keys;
    protected name = "Others";
}

export default VirtualOthers;