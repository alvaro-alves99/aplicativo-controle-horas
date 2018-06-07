var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(3000);

consign({verbose: false})
	.include('infra')
	.then('REST')
	.into(app)

module.exports = function(){
	return app;
};