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

export function parseBool(value: string): boolean {
    return value === 'true';
}

export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

export function bezier4points(x: number, p0: {x: number, y: number}, p1: {x: number, y: number}, p2: {x: number, y: number}, p3: {x: number, y: number}): number {
    return (1 - x) ** 3 * p0.y + 3 * (1 - x) ** 2 * x * p1.y + 3 * (1 - x) * x ** 2 * p2.y + x ** 3 * p3.y;
}

export function calculateProgression(x: number, k: number, sens: boolean): number {
    var p0 = { x: 0, y: 0     };
    var p1 = { x: 0, y: k     };
    var p2 = { x: 1, y: 1 - k };
    var p3 = { x: 1, y: 1     };
    if (sens) {
        var tx = p1.y;
        p1.y = p1.x;
        p1.x = tx;
        tx = p2.y;
        p2.y = p2.x;
        p2.x = tx;
    }
    return bezier4points(x, p0, p1, p2, p3);
}