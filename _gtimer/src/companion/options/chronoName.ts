import CompOptionType from "../../managers/optionTypes.js";

const chronoName: CompOptionType = {
    action: [
        {
            id: 'name',
            type: 'textinput',
            useVariables: true,
            label: 'Chrono name',
            default: 'Default'
        }
    ],
    feedback: []
};
chronoName.feedback = chronoName.action as typeof chronoName.feedback;

export default chronoName;