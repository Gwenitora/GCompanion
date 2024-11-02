import CompanionOptionType from "../../managers/optionTypes.js";

const scoresParams: CompanionOptionType = {
    action: [
        {
            id: 'transiTime',
            type: 'textinput',
            useVariables: true,
            label: 'Transition time (ms)',
            default: '5000'
        },
        {
            id: 'digits',
            type: 'textinput',
            useVariables: true,
            label: 'Digits',
            default: '',
        },
        {
            id: 'reg',
            type: 'textinput',
            useVariables: true,
            label: 'Format',
            default: '#',
            tooltip: '# = score, \\# just make an #, other char are displayed as is'
        },
    ],
    feedback: []
};
scoresParams.feedback = scoresParams.action as typeof scoresParams.feedback;

export default scoresParams;