import PresetManager from "../managers/presetManager.js";
import NextHalfHour_StartAndStop from "./presets/button/Chronos/nextHalfHour.js";
import NextHour_StartAndStop from "./presets/button/Chronos/nextHour.js";
import NextMidHour_StartAndStop from "./presets/button/Chronos/nextMidHour.js";
import Pause from "./presets/button/Chronos/pause.js";
import ResetPause from "./presets/button/Chronos/resetPause.js";
import StartAndStop from "./presets/button/Chronos/startStop.js";
import Day from "./presets/button/DateAndTime/day.js";
import FullDate from "./presets/button/DateAndTime/fullDate.js";
import Hour from "./presets/button/DateAndTime/hour.js";
import Minute from "./presets/button/DateAndTime/minute.js";
import MonthName from "./presets/button/DateAndTime/month.js";
import Second from "./presets/button/DateAndTime/second.js";
import Separator from "./presets/button/DateAndTime/separator.js";
import Time from "./presets/button/DateAndTime/time.js";
import Timestamp from "./presets/button/DateAndTime/timestamp.js";
import Weekday from "./presets/button/DateAndTime/weekDay.js";
import Year from "./presets/button/DateAndTime/year.js";
import DateSeparator from "./presets/text/dates.js";
import SpecialsChronos from "./presets/text/specialChronos.js";
import TimeSeparator from "./presets/text/time.js";

const setupPresets = () => {
    PresetManager
    
        .addPreset(new Timestamp())
        .addPreset(new DateSeparator())
        .addPreset(new FullDate())
        .addPreset(new Weekday())
        .addPreset(new Day())
        .addPreset(new MonthName())
        .addPreset(new Year())
        .addPreset(new TimeSeparator())
        .addPreset(new Time())
        .addPreset(new Separator())
        .addPreset(new Hour())
        .addPreset(new Minute())
        .addPreset(new Second())

        .addPreset(new StartAndStop())
        .addPreset(new Pause())
        .addPreset(new ResetPause())
        .addPreset(new SpecialsChronos())
        .addPreset(new NextHour_StartAndStop())
        .addPreset(new NextHalfHour_StartAndStop())
        .addPreset(new NextMidHour_StartAndStop());
}

export default setupPresets;