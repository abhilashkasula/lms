const express = require('express');
const {authorizeUser, serveUserStatus, logoutUser} = require('../handlers');
const user = express.Router();

user.use(authorizeUser('/user'));
user.get('/', (req, res) => res.render('user.html'));
user.get('/status', serveUserStatus);
user.post('/logout', logoutUser);

module.exports = {user};
