const express = require('express');
const {deleteBook, addBook, authorizeUser, serveUsers} = require('../handlers');
const admin = express.Router();

admin.use(authorizeUser('/admin'));
admin.get('/', (req, res) => res.render('admin.html'));
admin.get('/users', (req, res) => res.render('users.html'));
admin.get('/library-users', serveUsers);
admin.post('/delete', deleteBook);
admin.post('/add', addBook);

module.exports = {admin};
