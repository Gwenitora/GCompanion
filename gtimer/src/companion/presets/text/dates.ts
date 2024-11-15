import { CompPresetText } from "../../../managers/presetTemplate.js";
import CompPresetCategories from "../Categories.js";

class DateSeparator extends CompPresetText {
    protected id = "dateSeparator";
    protected text = "";
    protected category = CompPresetCategories.Dates;
    protected name = "View date";
}

export default DateSeparator;