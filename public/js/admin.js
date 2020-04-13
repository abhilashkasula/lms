const getBooks = function(callback) {
  fetch('books').then(res => res.json()).then(callback);
}

const generateBook = function({id, name, isAvailable}) {
  const bookContainer = document.createElement('div');
  bookContainer.id = id;
  bookContainer.className = 'book';
  const html = `<div class="book-options"><img class="svg hide delete" onclick="deleteBook(${id})" src="images/delete.svg"></div>
    <div class="book-name">${name}</div>
    <div class="book-status">${isAvailable}</div>`
  bookContainer.innerHTML = html;
  return bookContainer;
}

const drawBooks = function(books) {
  const shelf = document.querySelector('#book-shelf');
  shelf.innerHTML = '';
  books.forEach(book => shelf.appendChild(generateBook(book)));
};

const deleteBook = function(id) {
  fetch('admin/delete', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id})})
    .then(res => res.json()).then(drawBooks);
}

const main = function() {
  getBooks(drawBooks);
};

window.onload = main;
