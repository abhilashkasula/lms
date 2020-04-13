const serveBooks = function(req, res) {
  res.json(req.app.locals.books);
};

const deleteBook = function(req, res) {
  const {id} = req.body;
  req.app.locals.books.delete(id);
  res.json(req.app.locals.books);
}

const addBook = function(req, res) {
  const {name} = req.body;
  const {generateBookId, books} = req.app.locals;
  const id = generateBookId();
  books.add(id, name);
  res.json(books);
}

module.exports = {serveBooks, deleteBook, addBook};
