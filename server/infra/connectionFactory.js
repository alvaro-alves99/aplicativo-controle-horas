var mysql = require('mysql');



function createDBconnection(){
	return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'1234',
					database:'controle_tarefa',
					dateStrings:'date'
				});
}

module.exports = function(){
	return createDBconnection;
}