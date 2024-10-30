export function getWeekNumber(date: Date): number {
    const target = new Date(date.valueOf());
    const dayNumber = (target.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNumber + 3);
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const dayDiff = (target.getTime() - firstThursday.getTime()) / 86400000;
    return 1 + Math.floor(dayDiff / 7);
}