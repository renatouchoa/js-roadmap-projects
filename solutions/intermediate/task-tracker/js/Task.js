export default class Task {

    #id;

    #content;

    #preservedContent;

    #checked = false;

    constructor(content, id = Date.now(), cheched = false) {
        this.#content = content;
        this.#id = id;
        this.#checked = cheched;
    }

    setContent(content) {
        this.#content = content;
    }

    getContent() {
        return this.#content;
    }

    getId() {
        return this.#id;
    }

    check() {
        this.setCheck(true);
    }

    uncheck() {
        this.setCheck(false);
    }

    setCheck(state) {
        this.#checked = state;
    }

    isChecked() {
        return this.#checked;
    }

    toggle() {
        this.#checked = !this.#checked;
    }

    isNot(id) {
        return this.#id !== id;
    }

    preserveContent() {
        this.#preservedContent = this.#content;
    }

    restoreContent() {
        if (!this.#preservedContent) return this.#content;
        this.#content = this.#preservedContent;
        this.#preservedContent = null;
        return this.#content;
    }

    toJSON() {
        return {
            content: this.getContent(),
            checked: this.isChecked(),
        }
    }

}