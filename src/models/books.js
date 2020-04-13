const Book = require('./book');

const generateSeq = num => () => ++num;

class Books {
  constructor() {
    this.books = [];
  }

  add(id, name, isAvailable) {
    return this.books.push(new Book(id, name, isAvailable));
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

  generateNextId() {
    return this.books[this.books.length - 1].id + 1;
  }

  static load(bookList) {
    const books = new Books();
    bookList.forEach(book => books.add(book.id, book.name, book.isAvailable));
    const generateBookId = generateSeq(bookList[bookList.length - 1].id);
    return {books, generateBookId};
  }
}

module.exports = Books;