import CompanionOptionType from "../../managers/optionTypes.js";

const chronoName: CompanionOptionType = {
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