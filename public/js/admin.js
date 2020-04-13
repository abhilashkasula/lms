const getBooks = function(callback) {
  fetch('books').then(res => res.json()).then(callback);
};

const generateBook = function({id, name, isAvailable}) {
  const bookContainer = document.createElement('div');
  bookContainer.id = id;
  bookContainer.className = 'book';
  const html = `<div class="book-options"><img class="svg hide delete" onclick="deleteBook(${id})" src="images/delete.svg"></div>
    <div class="book-name">${name}</div>
    <div class="book-status">${isAvailable}</div>`
  bookContainer.innerHTML = html;
  return bookContainer;
};

const drawBooks = function(books) {
  const shelf = document.querySelector('#book-shelf');
  shelf.innerHTML = '';
  books.forEach(book => shelf.appendChild(generateBook(book)));
};

const deleteBook = function(id) {
  fetch('admin/delete', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id})})
    .then(res => res.json()).then(drawBooks);
};

const addBook = function() {
  const name = document.querySelector("#new-book").value.trim();
  if(!name) return;
  fetch('admin/add', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name})})
    .then(res => res.json()).then(drawBooks);
  name.value = '';
};

const clickButton = function(element, button) {
  const value = element.value.trim();
  if(!value) return;
  if(event.keyCode === 13) {
    document.querySelector(button).click();
  }
};

const searchBooks = function() {
  const text = document.querySelector('#search-bar').value;
  const regex = new RegExp(text, 'i');
  const books = Array.from(document.querySelectorAll('.book'));
  books.forEach(book => book.classList.add('hide-display'));
  books.forEach(book => book.children[1].innerHTML.match(regex) && book.classList.remove('hide-display'));
};

const addListeners = function() {
  const search = document.querySelector('#search-bar');
  const bookButton = document.querySelector('#new-book-button');
  const book = document.querySelector('#new-book');
  search.oninput = searchBooks;
  bookButton.onclick = addBook;
  book.onkeypress = () => clickButton(book, '#new-book-button');
};

const main = function() {
  getBooks(drawBooks);
  addListeners();
};

window.onload = main;
