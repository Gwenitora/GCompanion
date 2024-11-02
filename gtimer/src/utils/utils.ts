export function getWeekNumber(date: Date): number {
    const target = new Date(date.valueOf());
    const dayNumber = (target.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNumber + 3);
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const dayDiff = (target.getTime() - firstThursday.getTime()) / 86400000;
    return 1 + Math.floor(dayDiff / 7);
}

export function evaluateExpression(expression: string): number {
    try {
        const result = new Function(`return ${expression}`)();
        return Number(result);
    } catch (error) {
        throw new Error(`Invalid expression: "${expression}"`);
    }
}

export function mod(a: number, b: number): number {
    return ((a % b) + b) % b;
}