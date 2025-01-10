import { CompPresetText } from "../../../managers/presetTemplate.js";
import CompPresetCategories from "../Categories.js";

class TimeSeparator extends CompPresetText {
    protected id = "timeSeparator";
    protected text = "";
    protected category = CompPresetCategories.Dates;
    protected name = "View time";
}

export default TimeSeparator;