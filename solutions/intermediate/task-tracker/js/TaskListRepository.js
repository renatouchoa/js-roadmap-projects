import Task from "./Task.js";

export default class TaskListRepository {

    static #LS_KEY = 'taskList';

    static load(fn) {
        const data = localStorage.getItem(TaskListRepository.#LS_KEY);
        if (!data) {
            return [];
        }
        const tasks = JSON.parse(data);
        fn(tasks);
    }

    static save(tasks) {
        localStorage.setItem(TaskListRepository.#LS_KEY, JSON.stringify(tasks));
    }

}