const express = require('express');
const view = require('ejs');
const {admin} = require('./routers/admin');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', view.renderFile);
app.use(express.json());
app.use('/admin', admin);
// app.use(user);

module.exports = {app};
