import Task from "./Task.js";
import TaskListRepository from "./TaskListRepository.js";

export default class TaskList {

    #tasks = [];

    #lastId = 1;

    constructor() {
        TaskListRepository.load(data => {
            data.forEach(item => {
                this.#tasks.push(new Task(item.content, this.#generateId(), item.checked));
            })
        });
    }

    save() {
        TaskListRepository.save(this.#tasks);
    }

    isEmpty() {
        return this.#tasks.length === 0;
    }

    add(content) {
        const task = new Task(content, this.#generateId());
        this.#tasks.push(task);
        this.save();
        return task;
    }

    delete(id) {
        this.#tasks = this.#tasks.filter(task => task.isNot(id));
        this.save();
    }

    update(id, content) {
        this.find(id).setContent(content);
        this.save();
    }

    check(id) {
        this.find(id).check();
        this.save();
    }

    find(id) {
        return this.#tasks.find(task => task.getId() === id);
    }

    toggle(id) {
        this.find(id).toggle();
        this.save();
    }

    forEach(fn) {
        this.#tasks.forEach(task => {
            fn(task);
        });
    }

    #generateId() {
        return this.#lastId++;
    }

}