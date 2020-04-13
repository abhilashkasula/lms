const express = require('express');
const cookieParser = require('cookie-parser');
const view = require('ejs');
const {admin} = require('./routers/admin');
const {user} = require('./routers/user');
const Books = require('./models/books');
const {serveBooks, loginUser, findUser, authorize, signupUser} = require('./handlers');
const app = express();

const {books, generateBookId} = Books.load([{id: 1, name: 'Code'}]);
app.locals.generateBookId = generateBookId;
app.locals.books = books;
app.locals.users = [{id: 1, name: 'abhi', books: []}];
app.locals.userCredentials = {'abhi': {id: 1, password: 'abhi'}};
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
app.post('/signupUser', signupUser);
app.get('/books', serveBooks);

module.exports = {app};
