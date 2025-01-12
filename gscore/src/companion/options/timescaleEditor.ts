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
            type: 'number',
            label: 'Value',
            default: 1,
            min: 0,
            max: Infinity,
            tooltip: 'The value to set',
            isVisible: (options) => options.type === 1
        },
        {
            id: 'value1',
            type: 'number',
            label: 'First value',
            default: 0,
            min: 0,
            max: Infinity,
            tooltip: 'The first value to toggle (have the priority if time scale is not the first value or the second)',
            isVisible: (options) => options.type === 2
        },
        {
            id: 'value2',
            type: 'number',
            label: 'Second value',
            default: 1,
            min: 0,
            max: Infinity,
            tooltip: 'The second value to toggle',
            isVisible: (options) => options.type === 2
        }
    ],
    feedback: []
};
TimeScaleEdition.feedback = TimeScaleEdition.action as typeof TimeScaleEdition.feedback;

export default TimeScaleEdition;