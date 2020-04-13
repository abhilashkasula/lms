class Book {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isAvailable = true;
  }

  toggleAvailability() {
    this.isAvailable = !this.isAvailable;
    return this.name;
  }
}

module.exports = Book;