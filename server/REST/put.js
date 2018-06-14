module.exports = function(app){

	return app.put('/tarefas', function(req, res){

		var connection = app.infra.connectionFactory();

		console.log('REQ BODY');
		console.log(req.body);

		var date = new Date();
		var dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${req.body.horaSaida}:00`;

		var updateQuery = 'UPDATE tarefas SET horaSaida = ' + '\"' + dateString + '\"' + ' WHERE id = ' + req.body.id;

		connection.query(updateQuery, function(err, results){
			console.log(err);
			console.log(results);
		});
	});
}