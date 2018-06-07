module.exports = function(app){
	
	return app.put('/tarefas', function(req, res){

		var connection = app.infra.connectionFactory();

		var updateQuery = 'UPDATE tarefas SET horaSaida = ' + '\"' + req.body.horaSaida + '\"' + ' WHERE id = ' + req.body.id;

		connection.query(updateQuery, function(err, results){
			console.log(err);
			console.log(results);
		});
	});
}