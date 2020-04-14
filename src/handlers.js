const serveBooks = function(req, res) {
  res.json(req.app.locals.books);
};

const deleteBook = function(req, res) {
  const {id} = req.body;
  const {books, db} = req.app.locals;
  books.delete(id);
  db.set('libraryBooks', JSON.stringify(books));
  res.json(books);
}

const addBook = function(req, res) {
  const {name} = req.body;
  const {generateBookId, books, db} = req.app.locals;
  const id = generateBookId();
  books.add(id, name);
  db.set('libraryBooks', JSON.stringify(books));
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
  if(req.user && req.user.id && req.user.location) {
    return res.redirect(req.user.location);
  }
  next();
};

const authorizeUser = function(location) {
  return (req, res, next) => {
    if(req.user) {
      if(req.user.location === location) {
        return next();
      }
      return res.redirect(req.user.location);
    }
    res.render('notLogin.html');
  }
}

const serveUserStatus = function(req, res) {
  const userInfo = req.app.locals.users.getUserInfo(req.user.id);
  res.json(userInfo);
};

const serveUsers = function(req, res) {
  res.json(req.app.locals.users);
}

const generateSessionId = () => new Date().getTime() + 10;

const loginUser = function(req, res) {
  const {username, password} = req.body;
  const {sessions, userCredentials} = req.app.locals;
  const user = userCredentials[username];
  if(user && user.password === password) {
    const session = generateSessionId();
    sessions[session] = {id: user.id, location: '/user'};
    return res.cookie('session', session).json({location: '/user'});
  }
  res.json({err: 'Username or password is incorrect'});
};

const signupUser = function(req, res) {
  const {username, password} = req.body;
  const {userCredentials, users, generateUserId, db} = req.app.locals;
  if(userCredentials[username]) return res.json({err: 'Username already exists'});
  const id = generateUserId();
  userCredentials[username] = {id, password};
  users.add(id, username);
  db.set('libraryUserCredentials', JSON.stringify(userCredentials));
  db.set('libraryUsers', JSON.stringify(users));
  res.json({location: '/'});
};

const loginAdmin = function(req, res) {
  const {username, password} = req.body;
  const {adminCredentials, sessions} = req.app.locals;
  const admin = adminCredentials[username];
  if(admin && admin.password === password) {
    const session = generateSessionId();
    sessions[session] = {id: admin.id, location: '/admin'};
    return res.cookie('session', session).json({location: '/admin'});
  }
  res.json({err: 'Username or password is incorrect'});
}

const logoutUser = function(req, res) {
  const {id} = req.body;
  const {sessions} = req.app.locals;
  const {session} = req.cookies;
  if(sessions[session].id !== +id) return res.json({err: 'Something went wrong'});
  delete(sessions[session]);
  res.cookie('session', '').json({location: '/'});
};

module.exports = {serveBooks, deleteBook, addBook, loginUser, findUser, authorize, authorizeUser, signupUser, loginAdmin, serveUserStatus, logoutUser, serveUsers};
