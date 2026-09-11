export default class Uvindex {

    static #CATS = {
        BAIXO: {
            'key': 'baixo',
            'label': 'Baixo',
            'recomendation': 'Risco mínimo; seguro para ficar ao ar livre.',
            'badgeClass': 'light',
        },
        MODERADO: {
            'key': 'moderado',
            'label': 'Moderado',
            'recomendation': 'Risco moderado; recomenda-se usar protetor solar e óculos de escuros.',
            'badgeClass': 'info',
        },
        ALTO: {
            'key': 'alto',
            'label': 'Alto',
            'recomendation': 'Risco alto de queimaduras; busque sombra e limite o tempo ao sol no meio-dia.',
            'badgeClass': 'dark',
        },
        MUITO_ALTO: {
            'key': 'muito-alto',
            'label': 'Muito Alto',
            'recomendation': 'Risco muito alto; a pele queima rapidamente. Proteção essencial.',
            'badgeClass': 'warning',
        },
        EXTREMO: {
            'key': 'extremo',
            'label': 'Extremo',
            'recomendation': 'Risco extremo; evite ao máximo a exposição ao sol.',
            'badgeClass': 'danger',
        },
    };

    static getParams(uvindex) {
        uvindex = parseInt(uvindex);
        if (uvindex >= 11) return this.#CATS.EXTREMO;
        if (uvindex >= 8 && uvindex <= 10) return this.#CATS.MUITO_ALTO;
        if (uvindex >= 6 && uvindex <= 7) return this.#CATS.ALTO;
        if (uvindex >= 3 && uvindex <= 5) return this.#CATS.MODERADO;
        return this.#CATS.BAIXO;
    }
}