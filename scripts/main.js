"use strict"

let myLibrary = [];
let table = document.getElementById('Library')
let title = document.getElementById('title');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.getElementById('read');
let addBook = document.getElementById('submitB');
let newList = document.getElementById('newList');

class book
{
    constructor (title, author, pages, read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
    };
}

addBook.addEventListener('click', e =>  {
    e.preventDefault();
    addBookToLibrary();
    resetinputs();
});

newList.addEventListener('click', e => {
    e.preventDefault();
    localStorage.clear();
    location.reload();
});

function addBookToLibrary() {
    let b_title = title.value;
    let b_author = author.value;
    let b_pages = pages.value;
    let b_read = read.checked;

    if(!b_title || !b_author || !b_pages)
    {
        changeText('header','Missing or invalid data entered.');
        return;
    }
    changeText('header','Add Book');
    let newBook = new book(b_title, b_author, b_pages, b_read);
    addBookToStorage(newBook);
   displayLibrary(newBook);
}

function updateStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadStorage() {
    if (!localStorage.myLibrary)
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    else {
        JSON.parse(localStorage.getItem('myLibrary')).forEach(savedbook => {
            savedbook.__proto__ = Object.create(book.prototype);
            myLibrary.push(savedbook);
        });
    }
    myLibrary.forEach(book => displayLibrary(book));
}
function addBookToStorage(book) {
    myLibrary.push(book);
    updateStorage();
}

function displayLibrary(newBook) {
    table.innerHTML += `
    <tr data-book="${myLibrary.indexOf(newBook)}">
    <td class="libList">${newBook.title}</td>
    <td class="libList">${newBook.author}</td>
    <td class="libList">${newBook.pages}</td>
    <td class="libList">${newBook.read ? 'Yes' : 'No'}</td>
    </tr>`;
}

function changeText(iD,newText) {
    if (!iD || !newText)
        return;
    document.getElementById(iD).innerHTML = newText;
}

function resetinputs()
{
    let inputElements = document.querySelectorAll('.inputId');
    for(let i = 0; i < inputElements.length; i++)
    {
        if(inputElements[i].checked)
                inputElements[i].checked = false;
        inputElements[i].value = '';
    }
}
loadStorage();