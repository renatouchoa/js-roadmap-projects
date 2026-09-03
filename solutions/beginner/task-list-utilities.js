function addTask(tasks, title) {
    const ids = tasks.map(task => task.id);
    const nextId = Math.max(...ids) + 1;
    return [...tasks, {
        id: nextId,
        title,
        completed: false,
    }];
}

function completeTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });
}

function removeTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}

function countIncompleteTasks(tasks) {
    return tasks.filter(task => !task.completed).length;
}

const tasks = [
  { id: 1, title: 'Review variables', completed: true },
  { id: 2, title: 'Practice functions', completed: false },
];

const withNewTask = addTask(tasks, 'Build task utilities');
console.log(withNewTask.map((task) => task.title));

const completed = completeTask(withNewTask, 2);
console.log(countIncompleteTasks(completed));

console.log(removeTask(completed, 1).map((task) => task.id));
console.log(tasks.length);
console.log(countIncompleteTasks(tasks));