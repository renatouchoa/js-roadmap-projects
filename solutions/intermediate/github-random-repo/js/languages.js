export default class Languages {

    static #URL = 'https://raw.githubusercontent.com/nilbuild/githunt/refs/heads/master/src/components/filters/language-filter/languages.json';

    static async load() {
        try {
            const response = await fetch(encodeURI(Languages.#URL));
            if (!response.ok) {
                throw new Error('Falha na requisição à URL do arquivo de linguagens.');
            }
            return response.json();
        } catch (e) {
            console.error("Erro na consulta à lista de linguagens na internet.", e);
            throw e;
        }
    }
}