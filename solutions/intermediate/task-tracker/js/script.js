import TaskList from './TaskList.js';
////////////////////////////////////////////////////////////////////////////////////

const taskList = new TaskList();

////////////////////////////////////////////////////////////////////////////////////

const form = document.getElementById('form');
const list = document.getElementById('list');
const emptyMessage = document.getElementById('message-empty');

////////////////////////////////////////////////////////////////////////////////////

function buildInputDesc(task, onFocusFn, focusOutFn) {
    const input = document.createElement('input');
    input.type = task.getContent();
    input.className = 'task-desc';
    input.value = task.getContent();
    input.addEventListener('focus', onFocusFn);
    input.addEventListener('focusout', () => {
        taskList.update(task.getId(), input.value);
        focusOutFn();
        renderList();
    });
    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            input.dispatchEvent(new Event('focusout'));
        }
    });
    return input;
}

////////////////////////////////////////////////////////////////////////////////////

function buildCheckButton(task) {
    const button = document.createElement('button');
    button.className = 'task-check';
    button.addEventListener('click', e => {
        e.preventDefault();
        taskList.toggle(task.getId());
        renderList();
    });
    return button;
}

////////////////////////////////////////////////////////////////////////////////////

function buildDeleteButton(task) {
    const button = document.createElement('button');
    button.className = 'task-delete';
    button.addEventListener('click', e => {
        e.preventDefault();
        taskList.delete(task.getId());
        renderList();
    });
    return button;
}

////////////////////////////////////////////////////////////////////////////////////

function buildListITem(task) {
    const li = document.createElement('li');
    li.className = 'task';
    if (task.isChecked()) {
        li.classList.add('checked');
    } else {
        li.classList.remove('checked');
    }
    li.appendChild(buildCheckButton(task));
    li.appendChild(buildInputDesc(
        task,
        () => { /* on focus function */
            li.classList.add('editing');
        },
        () => { /* focus out function */
            li.classList.remove('editing');
        }
    ));
    li.appendChild(buildDeleteButton(task));
    return li;
}

////////////////////////////////////////////////////////////////////////////////////

function renderList() {
    list.innerHTML = '';
    if (taskList.isEmpty()) {
        emptyMessage.hidden = false;
        return;
    }
    emptyMessage.hidden = true;
    taskList.forEach(task => {
        list.appendChild(buildListITem(task));
    });
}

////////////////////////////////////////////////////////////////////////////////////

form.addEventListener('submit', e => {
    e.preventDefault();
    const content = (new FormData(e.target)).get('taskContent').trim();
    if (content === '') {
        return;
    }
    taskList.add(content);
    input.value = '';
    input.focus();
    renderList();
});

////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', e => {
    renderList();
})