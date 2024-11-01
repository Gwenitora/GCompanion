import CompanionOptionType from "../../managers/optionTypes.js";

const chronoSetup: CompanionOptionType = {
    action: [
        {
            id: 'hou',
            type: 'textinput',
            useVariables: true,
            label: 'Hours',
            default: ''
        },
        {
            id: 'min',
            type: 'textinput',
            useVariables: true,
            label: 'Minutes',
            default: ''
        },
        {
            id: 'sec',
            type: 'textinput',
            useVariables: true,
            label: 'Seconds',
            default: '30'
        },
        {
            id: 'cmode',
            type: 'checkbox',
            label: 'Clock mode (get elapsed time between now and target time)',
            default: false
        },
        {
            id: 'countdown',
            type: 'checkbox',
            label: 'Countdown',
            default: true
        },
        {
            id: 'reset',
            type: 'checkbox',
            label: 'Reset on end',
            default: true
        },
        {
            id: 'descriptionFormat',
            type: 'static-text',
            label: 'Format',
            value: (
                'To make a text, just use this text text.\nTo make a variable, use \'$H\', the variable has already 1 character for the name, and the case is important.' +
                '\n- $h -> The hour (ex: 0 | 6 | 21)\n- $H -> The hour in 2 digits (ex: 00 | 06 | 21)' +
                '\n- $m -> The minute (ex: 0 | 6 | 42)\n- $M -> The minute in 2 digits (ex: 00 | 06 | 42)' +
                '\n- $s -> The second (ex: 0 | 6 | 42)\n- $S -> The second in 2 digits (ex: 00 | 06 | 42)' +
                '\n- $: -> A \':\' to clint the : every second' +
                '\n- $\\ -> To keep the $ and don\'t use a variable (ex: $H -> 06 | $\\H -> $H)' +
                '\n- $K -> To no remove text if 0 (is as default) (ex: $K$H:$M:$S -> 00:42:00)' +
                '\n- $k -> To remove text if 0 (ex: $k$H:$M:$S -> 8:00 | $k$H:$M:$K$S -> 8:00 | $k$H:$M$K:$k$S -> 42:)'
            ).replaceAll('\n-', '\n•').replaceAll('\n', '<br>')
        },
        {
            id: 'reg',
            type: 'textinput',
            useVariables: true,
            label: 'Format when started',
            default: '$(gtimer:Format_Default)'
        },
        {
            id: 'regEnd',
            type: 'textinput',
            useVariables: true,
            label: 'Format when stopped',
            default: '$(gtimer:Format_Empty)'
        },
        {
            id: 'makeUpdate',
            type: 'checkbox',
            label: 'Update',
            default: false
        }
    ],
    feedback: []
};
chronoSetup.feedback = chronoSetup.action as typeof chronoSetup.feedback;

export default chronoSetup;