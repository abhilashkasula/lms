const express = require('express');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const view = require('ejs');
const {admin} = require('./routers/admin');
const {user} = require('./routers/user');
const Books = require('./models/books');
const Users = require('./models/users');
const {serveBooks, loginUser, findUser, authorize, signupUser, loginAdmin} = require('./handlers');

const app = express();
const client = redis.createClient(process.env.REDIS_URL || 'redis://localhost/');

const loadBooks = function(err, data) {
  const {books, generateBookId} = Books.load(JSON.parse(data) || []);
  app.locals.generateBookId = generateBookId;
  app.locals.books = books;
};

const loadUsers = function(err, data) {
  const {users, generateUserId} = Users.load(JSON.parse(data) || []);
  app.locals.generateUserId = generateUserId;
  app.locals.users = users;
};

(() => {
  client.get('libraryBooks', loadBooks);
  client.get('libraryUsers', loadUsers);
  client.get('libraryUserCredentials', (err, data) => {
    app.locals.userCredentials = JSON.parse(data) || {};
  });
  client.get('libraryAdminCredentials', (err, data) => {
    app.locals.adminCredentials = JSON.parse(data) || {};
  });
})();

app.locals.sessions = {};
app.locals.db = client;

app.set('view engine', 'html');
app.engine('html', view.renderFile);
app.use(express.static('public', {index: false}));
app.use(cookieParser());
app.use(findUser);
app.get(['/', '/admin-login', '/user-login'], authorize);
app.get(['/', '/user-login'], (req, res) => res.render('user_login.html'));
app.get('/admin-login', (req, res) => res.render('admin_login.html'));
app.use(express.json());
app.use('/admin', admin);
app.use('/user', user);
app.post('/loginUser', loginUser);
app.post('/loginAdmin', loginAdmin);
app.post('/signupUser', signupUser);
app.get('/books', serveBooks);

module.exports = {app};
