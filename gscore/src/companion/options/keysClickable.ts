import CompOptionType from "../../managers/optionTypes.js";

const keysClickable: CompOptionType = {
    action: [
        {
            id: 'key',
            type: 'dropdown',
            label: 'Key',
            default: 'RETURN',
            choices: [
                { id: '0', label: 'num 0' },
                { id: '1', label: 'num 1' },
                { id: '2', label: 'num 2' },
                { id: '3', label: 'num 3' },
                { id: '4', label: 'num 4' },
                { id: '5', label: 'num 5' },
                { id: '6', label: 'num 6' },
                { id: '7', label: 'num 7' },
                { id: '8', label: 'num 8' },
                { id: '9', label: 'num 9' },
                { id: 'BACKSPACE', label: 'erease' },
                { id: 'RETURN', label: 'return' },
                { id: 'DOT', label: 'dot' },
                { id: 'NUMPAD DIVIDE', label: 'divide' },
                { id: 'NUMPAD MULTIPLY', label: 'multiply' },
                { id: 'NUMPAD MINUS', label: 'minus' },
                { id: 'NUMPAD PLUS', label: 'plus' },
                { id: 'O', label: 'left parenthèse: \'(\'' },
                { id: 'C', label: 'right parenthèse: \')\'' }
            ]
        }
    ],
    feedback: []
};
keysClickable.feedback = keysClickable.action as typeof keysClickable.feedback;

export default keysClickable;