export default class Favlist {

    #list;

    static #KEY = 'favlist';

    constructor() {
        const data = localStorage.getItem(Favlist.#KEY);
        this.#list = data !== null ? new Map(JSON.parse(data)) : new Map();
    }

    add(city) {
        console.log()
        if (this.isFav(city)) {
            return;
        }
        this.#list.set(city.id, city);
        this.#save();
    }

    remove(city) {
        this.#list.delete(city.id);
        this.#save();
    }

    isFav(city) {
        return this.#list.has(city.id);
    }

    #save() {
        const data = Array.from(this.#list.entries());
        localStorage.setItem(Favlist.#KEY, JSON.stringify(data));
    }
}