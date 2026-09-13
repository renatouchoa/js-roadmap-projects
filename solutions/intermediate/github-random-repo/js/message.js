class Message {

    element = document.getElementById('message');

    $MESSAGES = {
        waiting: {
            text: 'Por favor, selecione uma linguagem.',
            className: 'alert alert-light',
        },
        loading: {
            text: 'Carregando. Por favor, aguarde...',
            className: 'alert alert-dark',
        },
        fail: {
            text: 'Erro durante o carregamento do repositório.',
            className: 'alert alert-danger',
        },
    }

    none() {
        this.element.innerHTML = '';
    }

    waiting() {
        this.#fetch(this.$MESSAGES.waiting);
    }

    loading() {
        this.#fetch(this.$MESSAGES.loading);
    }

    fail() {
        this.#fetch(this.$MESSAGES.fail);
    }

    #fetch(message) {
        this.none();
        const m = document.createElement('div');
        m.className = message.className;
        m.textContent = message.text;
        this.element.appendChild(m);
    }

}

export default new Message();