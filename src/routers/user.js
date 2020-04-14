const express = require('express');
const {authorizeUser,serveUserStatus} = require('../handlers');
const user = express.Router();

user.use(authorizeUser('/user'));
user.get('/', (req, res) => res.render('user.html'));
user.get('/status', serveUserStatus);

module.exports = {user};
