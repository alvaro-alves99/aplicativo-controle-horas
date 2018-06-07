var http = require('http');

var app = require('./config/express')();

console.log(app);

var bodyParser = require("body-parser");

var consign = require('consign');

var path = require('path');
// var connectionFactory = require('./config/connection/connectionFactory');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log('Servidor escutando na porta 3000');