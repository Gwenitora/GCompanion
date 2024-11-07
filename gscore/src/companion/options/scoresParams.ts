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
            type: 'dropdown',
            label: 'Algorithm',
            id: 'transitionAlgorithm',
            default: 'sinusoidal',
            choices: [
                { id: 'linear', label: 'Linear' },
                { id: 'quadratic', label: 'Quadratic' },
                { id: 'cubic', label: 'Cubic' },
                { id: 'quartic', label: 'Quartic' },
                { id: 'quintic', label: 'Quintic' },
                { id: 'sinusoidal', label: 'Sinusoidal' },
                { id: 'exponential', label: 'Exponential' },
                { id: 'circular', label: 'Circular' },
                { id: 'elastic', label: 'Elastic' },
                { id: 'back', label: 'Back' },
                { id: 'bounce', label: 'Bounce' },
            ],
            isVisible: (options): boolean => {
                return options.transiTime != null && (options.transiTime as number) > 0
            }
        },
        {
            type: 'dropdown',
            label: 'Fade type',
            id: 'fadeType',
            default: 'ease-in-out',
            choices: [
                { id: 'ease-in', label: 'Ease-in' },
                { id: 'ease-out', label: 'Ease-out' },
                { id: 'ease-in-out', label: 'Ease-in-out' },
            ],
            isVisible: (options): boolean => {
                return (
                    options.transiTime != null &&
                    options.transitionAlgorithm != null &&
                    (options.transiTime as number) > 0 &&
                    (options.transitionAlgorithm as string) !== 'linear'
                )
            }
        },
        {
            id: 'digits',
            type: 'textinput',
            useVariables: true,
            label: 'Digits',
            default: '',
            tooltip: 'Number of digits to display after the comma.'
        },
        {
            id: 'reg',
            type: 'textinput',
            useVariables: true,
            label: 'Format',
            default: '#',
            tooltip: '# => score\n\\# => just make an #, other char are displayed as is'
        }
    ],
    feedback: []
};
scoresParams.feedback = scoresParams.action as typeof scoresParams.feedback;

export default scoresParams;