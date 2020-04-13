const express = require('express');
const cookieParser = require('cookie-parser');
const view = require('ejs');
const {admin} = require('./routers/admin');
const {user} = require('./routers/user');
const Books = require('./models/books');
const Users = require('./models/users');
const {serveBooks, loginUser, findUser, authorize, signupUser, loginAdmin} = require('./handlers');
const app = express();

const {books, generateBookId} = Books.load([{id: 1, name: 'Code'}]);
const {users, generateUserId} = Users.load([{id: 1, name: 'abhi', books: []}]);
app.locals.generateBookId = generateBookId;
app.locals.generateUserId = generateUserId;
app.locals.books = books;
app.locals.users = users;
app.locals.userCredentials = {'abhi': {id: 1, password: 'abhi'}};
app.locals.adminCredentials = {'abhilash': {id:1, password: 'abhilash'}};
app.locals.sessions = {2: {id: 1, location: '/user'}};

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
