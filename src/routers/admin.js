const express = require('express');
const {deleteBook} = require('../handlers');
const admin = express.Router();

admin.get('/', (req, res) => res.render('admin.html'));
admin.post('/delete', deleteBook);

module.exports = {admin};
