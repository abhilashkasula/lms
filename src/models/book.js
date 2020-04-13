class Book {
  constructor(id, name, isAvailable = true) {
    this.id = id;
    this.name = name;
    this.isAvailable = isAvailable;
  }

  toggleAvailability() {
    this.isAvailable = !this.isAvailable;
    return this.name;
  }
}

module.exports = Book;