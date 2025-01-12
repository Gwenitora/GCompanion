import CompOptionType from "../../managers/optionTypes.js";

const TimeScaleEdition: CompOptionType = {
    action: [
        {
            id: 'type',
            type: 'dropdown',
            label: 'Type of action',
            default: 0,
            choices: [
                { id: 0, label: 'Toggle between 0 and 1'  },
                { id: 2, label: 'Toggle between 2 values' },
                { id: 1, label: 'Set to one value'        }
            ],
            tooltip: 'For the toggle, for more precision, he set to the first value everytime except if timescale is already to the first value'
        },
        {
            id: 'value0',
            type: 'textinput',
            label: 'Value',
            default: '1',
            tooltip: 'The value to set',
            isVisible: (options) => options.type === 1,
            useVariables: true
        },
        {
            id: 'value1',
            type: 'textinput',
            label: 'First value',
            default: '0',
            tooltip: 'The first value to toggle (have the priority if time scale is not the first value or the second)',
            isVisible: (options) => options.type === 2,
            useVariables: true
        },
        {
            id: 'value2',
            type: 'textinput',
            label: 'Second value',
            default: '1',
            tooltip: 'The second value to toggle',
            isVisible: (options) => options.type === 2,
            useVariables: true
        }
    ],
    feedback: []
};
TimeScaleEdition.feedback = TimeScaleEdition.action as typeof TimeScaleEdition.feedback;

export default TimeScaleEdition;