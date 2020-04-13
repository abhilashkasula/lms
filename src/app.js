const express = require('express');
const view = require('ejs');
const {admin} = require('./routers/admin');
const Books = require('./models/books');
const {serveBooks} = require('./handlers');
const app = express();

const {books, generateBookId} = Books.load([{id: 1, name: 'Code'}]);
app.locals.generateBookId = generateBookId;
app.locals.books = books;

app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', view.renderFile);
app.use(express.json());
app.use('/admin', admin);
app.get('/books', serveBooks);
// app.use(user);

module.exports = {app};
