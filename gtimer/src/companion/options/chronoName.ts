import { SomeCompanionActionInputField } from "@companion-module/base/dist/index.js";

const chronoName: SomeCompanionActionInputField[] = [
    {
        id: 'name',
        type: 'textinput',
        useVariables: true,
        label: 'Chrono name',
        default: 'Default'
    }
];

export default chronoName;