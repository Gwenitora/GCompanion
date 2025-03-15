import { qtBoolean } from "../Buzzer.js";
import { mappings } from "./mapping.js";

const powerOfTwo: number[] = [];
for (let i = 0; i < 32; i++) {
    powerOfTwo[i] = Math.pow(2, i);
}

const readByte = (byte: number): boolean[] => {
    const result = [false, false, false, false, false, false, false, false];
    for (let i = 7; i >= 0; i--) {
        if (byte & powerOfTwo[i]) {
            result[7 - i] = true;
        }
    }
    return result;
}

const bufferToBooleans = (byteArray: Buffer): boolean[][] => {
    return Array.from(byteArray).map((byte) => readByte(byte));
}

const mapper = (Buff: Buffer): [qtBoolean, qtBoolean, qtBoolean, qtBoolean] => {
    const bytes = bufferToBooleans(Buff);
    const flatMap = mappings.map((btn) => Boolean(bytes[btn.bytes[0]][btn.bytes[1]]));
    var map = [];
    for (let i = 0; i < 4; i++) {
        map.push(flatMap.slice(i * 5, i * 5 + 5));
    }
    return map as [qtBoolean, qtBoolean, qtBoolean, qtBoolean];
};
export default mapper;