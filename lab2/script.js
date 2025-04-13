
const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

const confirm = document.getElementById('confirm');
const confirmText = document.getElementById('confirm-text');
const confirmAcceptDelete = document.getElementById('confirm_accept-delete');
const confirmCancelDelete = document.getElementById('confirm_cancel-delete');

let lastDeletedItem = null;
let itemToDelete = null;

addButton.addEventListener('click', () => {
    const task = input.value.trim();
    if (!task) {
        alert('Nie ma żadnego zadania?');
        return;
    }

    const listItem = document.createElement('li');

    const taskItem = document.createElement('span');
    taskItem.textContent = task;
    taskItem.className = 'task-text';
    taskItem.addEventListener('click', taskStatus);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        itemToDelete = listItem;
        confirmText.textContent = `Czy na pewno chcesz usunąć zadanie o treści: "${task}"?`;
        confirm.style.display = 'flex';
    });

    listItem.appendChild(taskItem);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
    input.value = '';
});

function taskStatus(event) {
    const taskItem = event.target;
    const listItem = taskItem.parentElement;

    if (listItem.classList.contains('done')) {
        // Cofnij zrobione
        listItem.classList.remove('done');

        // Usuń datę, jeśli istnieje
        const dateInfo = listItem.querySelector('.date-info');
        if (dateInfo) {
            dateInfo.remove();
        }
    } else {
        // Oznacz jako zrobione
        listItem.classList.add('done');

        const date = new Date().toLocaleString();
        const dateSpan = document.createElement('span');
        dateSpan.className = 'date-info';
        dateSpan.textContent = ` (Zrobione: ${date})`;

        // Wstaw datę przed przyciskiem X
        listItem.insertBefore(dateSpan, listItem.querySelector('.delete-button'));
    }
}

function returnDelete() {
    if (lastDeletedItem) {
        todoList.appendChild(lastDeletedItem);
        lastDeletedItem = null;
    } else {
        alert('Brak zadania do cofnięcia.');
    }
}

confirmAcceptDelete.addEventListener('click', () => {
    if (itemToDelete) {
        lastDeletedItem = itemToDelete;
        lastDeletedItem.remove();
        confirm.style.display = 'none';
    }
});

confirmCancelDelete.addEventListener('click', () => {
    itemToDelete = null;
    confirm.style.display = 'none';
});
