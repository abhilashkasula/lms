const getBooks = function(callback) {
  fetch('books').then(res => res.json()).then(callback);
}

const getUserInfo = function(callback) {
  fetch('/user/status').then(res => res.json()).then(callback);
}

const generateBook = function(book) {
  const bookContainer = document.createElement('div');
  const name = document.createElement('div');
  const status = document.createElement('div');
  name.innerText = book.name;
  status.innerText = book.isAvailable;
  status.className = 'book-status';
  name.className = 'book-name';
  bookContainer.id = book.id;
  bookContainer.className = 'book';
  bookContainer.appendChild(name);
  bookContainer.appendChild(status);
  return bookContainer;
};

const drawUserInfo = function({id, name, books}) {
  document.querySelector('#username').innerText = name;
  document.querySelector('#user-id').value = id;
  const shelf = document.querySelector('#borrowed-books');
  const booksHtml = books.map(book => generateBook(book));
  if(booksHtml > 0) {
    return booksHtml.forEach(book => shelf.appendChild(book));
  }
  shelf.className = 'empty';
  shelf.innerText = 'No books';
};

const drawBooks = function(books) {
  const shelf = document.querySelector('#book-shelf');
  const booksHtml = books.map(book => generateBook(book));
  if(booksHtml.length > 0) {
    return booksHtml.forEach(book => shelf.appendChild(book));
  }
  shelf.className = 'empty';
  shelf.innerText = 'No books';
};

const searchBooks = function() {
  const text = document.querySelector('#search-bar').value;
  const regex = new RegExp(text, 'i');
  const books = Array.from(document.querySelectorAll('.book'));
  books.forEach(book => book.classList.add('hide-display'));
  books.forEach(book => book.children[0].innerText.match(regex) && book.classList.remove('hide-display'));
}

const redirect = function({err, location}) {
  if(!err) return window.location.replace(location);
};

const logout = function() {
  const id = document.querySelector("#user-id").value;
  console.log(id);
  fetch('user/logout', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id})})
    .then(res => res.json()).then(redirect);
};

const addListeners = function() {
  const search = document.querySelector('#search-bar');
  search.oninput = searchBooks;
  const button = document.querySelector('#logout');
  button.onclick = logout;
}

const main = function() {
  getBooks(drawBooks);
  getUserInfo(drawUserInfo);
  addListeners();
};
window.onload = main;