var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(3000);

consign({verbose: false})
	.include('infra')
	.then('REST')
	.then('app-rotas')
	.into(app)

module.exports = function(){
	return app;
};