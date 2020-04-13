const Book = require('./book');

class Books {
  constructor() {
    this.books = [];
  }

  add(id, name) {
    return this.books.push(new Book(id, name));
  }

  delete(id) {
    const position = this.books.findIndex(book => book.id === +id);
    return this.books.splice(position, 1);
  }

  findBook(id) {
    return this.books.find(book => book.id === id);
  }

  toggleAvailability(id) {
    const book = this.findBook(id);
    return book.toggleAvailability();
  }

  toJSON() {
    return this.books;
  }

  static load(bookList) {
    const books = new Books();
    bookList.forEach(book => books.add(book.id, book.name));
    return books;
  }
}

module.exports = Books;