const getUsers = function(callback) {
  fetch('library-users').then(res => res.json()).then(callback);
};

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

const generateUser = function({id, name, books}) {
  const userContainer = document.createElement('div');
  userContainer.className = 'user';
  userContainer.id = id;
  userContainer.innerText = name;
  userContainer.onclick = showInfo;
  return userContainer
};

const showInfo = function() {
  const id = event.target.id;
  const shelves = Array.from(document.querySelectorAll('.borrowed-shelf'));
  shelves.forEach(shelf => shelf.classList.add('hide-display'));
  document.querySelector(`#user-${id}`).classList.remove('hide-display');
};

const generateTabs = function({id, books}) {
  const tab = document.createElement('div');
  tab.className = 'shelf borrowed-shelf hide-display';
  tab.id = `user-${id}`;
  const booksHtml = books.map(book => generateBook(book));
  if(booksHtml.length > 0) {
    return booksHtml.forEach(book => tab.appendChild(book));
  }
  tab.className = 'borrowed-shelf empty hide-display';
  tab.innerText = 'No books';
  return tab;
}

const drawUsers = function(users) {
  const usersContainer = document.querySelector('#users');
  const userTab = document.querySelector('#user-tab');
  const userHtml = users.map(user => generateUser(user));
  const tabsHtml = users.map(user => generateTabs(user));
  if(userHtml.length > 0) {
    tabsHtml.forEach(tab => userTab.appendChild(tab));
    return userHtml.forEach(user => usersContainer.appendChild(user));
  }
  usersContainer.className = 'empty';
  usersContainer.innerText = 'No users';
};

const main = function() {
  getUsers(drawUsers);
};

window.onload = main;
