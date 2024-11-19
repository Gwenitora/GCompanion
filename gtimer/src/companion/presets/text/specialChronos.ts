import { CompPresetText } from "../../../managers/presetTemplate.js";
import CompPresetCategories from "../Categories.js";

class SpecialsChronos extends CompPresetText {
    protected id = "specialChronos";
    protected text = "";
    protected category = CompPresetCategories.Chronos;
    protected name = "Specials Chronos (Start / Stop)";
}

export default SpecialsChronos;