import Languages from "./languages.js";

class Selector {

    #form = document.getElementById('selector');

    #input = document.getElementById('selector-input');

    #datalist = document.getElementById('selector-datalist');

    fetch(onSubmitCallback) {
        this.setStateLoading();
        Languages.load()
            .then(languages => {
                this.#datalist.innerHTML = '';
                languages.forEach(lang => {
                    const option = document.createElement('option');
                    option.value = lang.value;
                    option.textContent = lang.title;
                    this.#datalist.appendChild(option);
                });
                this.setStateReady();
                this.#form.addEventListener('submit', e => {
                    e.preventDefault();
                    if (this.#input.value.trim() === '') {
                        return;
                    }
                    onSubmitCallback(this.#input.value.trim());
                });
            })
            .catch(e => {
                console.error("Falha no carregamento da lista de linguagens.", e);
                this.setStateFail();
            });
    }

    setStateLoading() {
        this.#input.disabled = true;
        this.#input.value = 'Carregando linguagens...';
    }

    setStateReady() {
        this.#input.disabled = false;
        this.#input.value = '';
    }

    setStateFail() {
        this.#input.disabled = true;
        this.#input.value = 'Não foi possível carregar a lista de linguagens.';
    }

}

export default new Selector();