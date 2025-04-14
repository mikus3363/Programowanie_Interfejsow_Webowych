"use strict";

const input = document.getElementById('todo-input');    // element do wpisywania zadania
const addButton = document.getElementById('add-button');    // przycisk do dodawania zadania
const listSelector = document.getElementById('list-select');    // menu do wyboru listy
const listsContainer = document.getElementById('lists-container');  // kontener do wyświetlania listy zadań
const newListInput = document.getElementById('new-list-name');  // nowa lista do dodania
const addListButton = document.getElementById('add-list-button');   // przycisk do dodawania nowej listy

const confirm = document.getElementById('confirm'); // potwierdzenie usunięcia
const confirmText = document.getElementById('confirm-text');    // tekst wewnatrz potwierdzacza
const confirmAcceptDelete = document.getElementById('confirm_accept-delete');   // zatwierdzenie usuwania
const confirmCancelDelete = document.getElementById('confirm_cancel-delete');   // anulowanie usuwania

// konieczne uzycie let do przechowywania i zmieniania na bierzaco usunietych elementow i list ktore chcemy dodac
let lastDeletedItem = null; // ostatni element usuniety
let itemToDelete = null;    // element do usuniecia
let listsToDo = {}; // listy i ich elementy

const predefinedLists = ['Uczelnia', 'Dom', 'Praca']; // listy ktore sa przy aktywacji programu

function createList(name) { // zabezpieczenie zeby nie tworzyc dwoch takich samych list
    if (listsToDo[name]) return;

    const listWrapper = document.createElement('div'); // kontener dla jednej listy
    listWrapper.className = 'list-wrapper'; // klasa do zawijania listy

    const header = document.createElement('h2'); // naglowek

    const ul = document.createElement('ul'); // pusta lista zadan
    ul.className = 'todo-list';

    header.textContent = name;
    header.className = 'list-header';

    header.addEventListener('click', () => {
        ul.classList.toggle('hidden'); // jak wcisnie sie naglowek to albo elementy beda ukryte albo pokazane
    });

    listWrapper.appendChild(header);
    listWrapper.appendChild(ul);
    listsContainer.appendChild(listWrapper); // dodanie kontenera z lista do glownego kontenera z przypisanymi naglowkiem i listy

    listsToDo[name] = ul;

    const option = document.createElement('option'); // tworzymy opcje dodawania do tej listy
    option.value = name;
    option.textContent = name;

    listSelector.appendChild(option); // do selektora list laduje nowo stworzona lista
}

function addTaskToList(task, listName) {
    if (!listsToDo[listName]) return; // jak lista nie istnieje to koniec

    const listItem = document.createElement('li'); // element listy dla nowego zadania

    const taskItem = document.createElement('span'); // element tekstowy

    taskItem.textContent = task;
    taskItem.className = 'task-text'; // ustawienie tekstu i klasy do zadania

    taskItem.addEventListener('click', taskStatus); // obsluga klikniecia, zmiany statusu zadania

    const deleteButton = document.createElement('button'); // przycisk do usuwania zadania
    deleteButton.textContent = 'X'; // tekst do przycisku
    deleteButton.className = 'delete-button'; // klasa przycisku

    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // zapobiega aby nie uruchamialo sie to przy kliknieciu na zadanie
        itemToDelete = listItem;
        confirmText.textContent = `Czy na pewno chcesz usunąć zadanie o treści: "${task}"?`; // komunikat
        confirm.style.display = 'flex'; // pokazuje model potwierdzenia
    });

    listItem.appendChild(taskItem);
    listItem.appendChild(deleteButton);
    listItem.dataset.listName = listName; // nazwa listy jako atrybut

    listsToDo[listName].appendChild(listItem); // dodajemy zadanie do konkretnej listy
}

addButton.addEventListener('click', () => {
    const task = input.value.trim(); // tekst zadania z usunieciem bialych znakow
    const listName = listSelector.value; // nazwa listy do ktorej dodamy zadanie
    if (!task) { // zabezpieczenie jak zadanie bedzie puste
        alert('Nie ma żadnego zadania?');
        return;
    }
    addTaskToList(task, listName); // dodanie zadania do listy
    input.value = ''; // wyczyszczenie pola tekstowego po dodaniu
});

addListButton.addEventListener('click', () => {
    const newList = newListInput.value.trim(); // nazwa nowej listy
    if (!newList) return; // zabezpieczenie przed pustym polem
    createList(newList); // tworzenie nowej listy
    newListInput.value = ''; // wyczyszczenie pola list po dodaniu
});

function taskStatus(event) {
    const taskItem = event.target; // klikniety element
    const listItem = taskItem.parentElement;    // element zadania

    if (listItem.classList.contains('done')) {
        listItem.classList.remove('done'); // jak zadanie bylo zrobione to zostaje odznaczone
        const dateInfo = listItem.querySelector('.date-info');
        if (dateInfo) {
            dateInfo.remove(); // usuniecie daty zakonczenia zadania
        }
    } else {
        listItem.classList.add('done'); // oznacza zadanie na zrobione
        const date = new Date().toLocaleString(); // pobiera date
        const dateSpan = document.createElement('span');
        dateSpan.className = 'date-info';
        dateSpan.textContent = ` (Zrobione: ${date})`;
        listItem.insertBefore(dateSpan, listItem.querySelector('.delete-button')); // ustawia date do zrobionego zadania
    }
}

function returnDelete() {
    if (lastDeletedItem) {
        const parentListName = lastDeletedItem.dataset.listName; // nazwa listy z ktorej zadanie jest usuwane
        if (listsToDo[parentListName]) {
            listsToDo[parentListName].appendChild(lastDeletedItem); // dodaje zadanie do listy listsToDo
        }
        lastDeletedItem = null; // czyscimy przetrzymanie zadania usunietego
    } else {
        alert('Brak zadania do cofnięcia.');
    }
}

confirmAcceptDelete.addEventListener('click', () => {
    if (itemToDelete) {
        lastDeletedItem = itemToDelete; // zapis jako ostatnio usuniete
        lastDeletedItem.remove(); // usuniecie zadania
        confirm.style.display = 'none'; // ukrywa okno zatwierdzania usuniecia
    }
});

confirmCancelDelete.addEventListener('click', () => {
    itemToDelete = null; // czyscimy zmienna elementu do usuniecia
    confirm.style.display = 'none'; // ukrywa okno zatwierdzania usuniecia
});

predefinedLists.forEach(createList); // predefiniowanie list na starcie programu