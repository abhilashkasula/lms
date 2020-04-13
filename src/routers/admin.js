const express = require('express');
const {deleteBook, addBook} = require('../handlers');
const admin = express.Router();

admin.get('/', (req, res) => res.render('admin.html'));
admin.post('/delete', deleteBook);
admin.post('/add', addBook);

module.exports = {admin};
