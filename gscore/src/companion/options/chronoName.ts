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
    feedback: [
        {
            id: 'name',
            type: 'textinput',
            useVariables: true,
            label: 'Chrono name',
            default: 'Default'
        }
    ]
};

export default chronoName;