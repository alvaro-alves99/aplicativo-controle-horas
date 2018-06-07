var mysql = require('mysql');

var connection = mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'1234',
					database:'controle_tarefa'
				})

module.exports = function(){
	return connection;
}