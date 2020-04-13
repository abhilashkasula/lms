const serveBooks = function(req, res) {
  res.json(req.app.locals.books);
};

const deleteBook = function(req, res) {
  const {id} = req.body;
  req.app.locals.books.delete(id);
  res.json(req.app.locals.books);
}

module.exports = {serveBooks, deleteBook};
