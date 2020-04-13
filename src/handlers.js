const serveBooks = function(req, res) {
  res.json(req.app.locals.books);
};

module.exports = {serveBooks};
