const express = require('express');

const user = express.Router();

user.get('/', (req, res) => res.render('user.html'));

module.exports = {user};
