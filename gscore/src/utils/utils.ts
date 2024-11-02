type p= {x: number, y: number};

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

export function bezier4points(x: number, p0: p, p1: p, p2: p, p3: p): number {
    return (1 - x) ** 3 * p0.y + 3 * (1 - x) ** 2 * x * p1.y + 3 * (1 - x) * x ** 2 * p2.y + x ** 3 * p3.y;
}

export function calculateProgression(x: number, k: number): number {
    return x;
    var p0: [p, p, p, p] = [
        { x: 0, y: 0        },
        { x: 0, y: .1       },
        { x: .9-k, y: k-.1  },
        { x: 1-k, y: k      }
    ];
    var p1: [p, p, p, p] = [
        { x: 1-k, y: k      },
        { x: 1.1-k, y: k+.1 },
        { x: .9, y: 1       },
        { x: 1, y: 1        }
    ];
    if (k > .5) {
        var tmp = p0[1].y;
        p0[1].y = p1[1].x;
        p1[1].x = tmp;
        tmp = p1[2].y;
        p1[2].y = p0[2].x;
        p0[2].x = tmp;
    }
    if (k === .5) {
        p0[1].x = p1[1].y;
        p1[2].y = p0[2].x;
    }
    if (x > 1-k) {
        return bezier4points(x, ...p1);
    }
    return bezier4points(x, ...p0);
}