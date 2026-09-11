export default class Moonphase {

    static #PHASES = {
        NEW_MOON: {
            name: { en: 'New Moon', pt: 'Lua Nova' },
            icon: { className: 'bi bi-circle-fill', style: '' },
        },
        WAXING_CRESCENT: {
            name: { en: 'Waxing Crescent', pt: 'Crescente' },
            icon: { className: 'bi bi-moon', style: '' },
        },
        FIRST_QUARTER: {
            name: { en: 'First Quarter', pt: 'Quarto Crescente' },
            icon: { className: 'bi bi-moon', style: '' },
        },
        WAXING_GIBBOUS: {
            name: { en: 'Waxing Gibbous', pt: 'Crescente Gibosa' },
            icon: { className: 'bi bi-moon', style: '' },
        },
        FULL_MOON: {
            name: { en: 'Full Moon', pt: 'Lua Cheia' },
            icon: { className: 'bi bi-circle', style: '' },
        },
        WANING_GIBBOUS: {
            name: { en: 'Waning Gibbous', pt: 'Minguante Gibosa' },
            icon: { className: 'bi bi-moon', style: 'transform: rotate(-90deg); display: inline-block;' },
        },
        LAST_QUARTER: {
            name: { en: 'Last Quarter', pt: 'Quarto Minguante' },
            icon: { className: 'bi bi-moon', style: 'transform: rotate(-90deg);; display: inline-block;' },
        },
        WANING_CRESCENT: {
            name: { en: 'Waning Crescent', pt: 'Minguante' },
            icon: { className: 'bi bi-moon', style: 'transform: rotate(-90deg);; display: inline-block;' },
        },
    };

    static get(fract) {
        fract = parseFloat(fract);
        if (fract > 0 && fract < 0.25) return this.#PHASES.WAXING_CRESCENT;
        if (fract === 0.25) return this.#PHASES.FIRST_QUARTER;
        if (fract > 0.25 && fract < 0.5) return this.#PHASES.WAXING_GIBBOUS;
        if (fract === 0.5) return this.#PHASES.FULL_MOON;
        if (fract > 0.5 && fract < 0.75) return this.#PHASES.WANING_GIBBOUS;
        if (fract === 0.75) return this.#PHASES.LAST_QUARTER;
        if (fract > 0.75 && fract < 1) return this.#PHASES.WANING_CRESCENT;
        return this.#PHASES.NEW_MOON;
    }
}