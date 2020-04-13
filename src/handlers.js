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

const findUser = function(req, res, next) {
  const {session} = req.cookies;
  const {sessions} = req.app.locals;
  if(session && sessions[session]) {
    req.user = sessions[session];
  }
  next()
};

const authorize = function(req, res, next) {
  console.log(req.user);
  if(req.user && req.user.id && req.user.location) {
    return res.redirect(req.user.location);
  }
  next();
};

const generateSeq = num => () => ++num;
const generateSessionId = generateSeq(0);

const loginUser = function(req, res, next) {
  const {username, password} = req.body;
  const {sessions, userCredentials} = req.app.locals;
  const user = userCredentials[username];
  if(user && user.password === password) {
    const session = generateSessionId();
    sessions[session] = {id: user.id, location: '/user'};
    return res.cookie('session', session).json({location: '/user'});
  }
  return res.json({err: 'Username or password is incorrect'});
};

module.exports = {serveBooks, deleteBook, addBook, loginUser, findUser, authorize};
