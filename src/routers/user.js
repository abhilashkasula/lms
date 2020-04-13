const express = require('express');
const {authorizeUser} = require('../handlers');
const user = express.Router();

user.use(authorizeUser('/user'));
user.get('/', (req, res) => res.render('user.html'));

module.exports = {user};
