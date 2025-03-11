import CompOptionType from "../managers/optionTypes.js";

export const transformOptToPresetOpt = (...opts: CompOptionType[]) => {
    if (opts.length === 0) return {};
    var dest: {[key in string]: (undefined | boolean | string | number) | (string | number)[]} = {};
    opts.forEach(opt => {
        opt.action.forEach(action => {
            if ((action as any).default === undefined) return;
            dest[action.id] = (action as any).default;
        });
    });
    return dest;
}