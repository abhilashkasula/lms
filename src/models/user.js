class User {
  constructor(id, name, books = []) {
    this.id = id;
    this.name = name;
    this.books = books;
  }
  assign(bookId, bookName) {
    return this.books.push({bookId, bookName});
  }

  return(bookId) {
    const bookPosition = this.books.findIndex(book => book.id === bookId);
    return this.books.splice(bookPosition, 1);
  }
}

module.exports = User;