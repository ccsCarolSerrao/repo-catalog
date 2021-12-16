export class MathUtil {
    static toRound(decimal: number, digits: number = 2) {
        return Number(decimal.toFixed(digits));
    }

    static toPercente(decimal: number, digits: number = 2) {
        return this.toRound(decimal * 100, digits);
    }
}
