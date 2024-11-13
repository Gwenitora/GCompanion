import CompOptionType from "../../managers/optionTypes.js";

const scoresName: CompOptionType = {
    action: [
        {
            id: 'name',
            type: 'textinput',
            useVariables: true,
            label: 'Name of your score variable',
            default: 'Team cat'
        }
    ],
    feedback: []
};
scoresName.feedback = scoresName.action as typeof scoresName.feedback;

export default scoresName;