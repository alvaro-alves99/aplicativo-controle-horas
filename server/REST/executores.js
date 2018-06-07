module.exports = function(app){

	app.get("/executores", function(req, res){

		var connection = app.infra.connectionFactory();

		res.set({ 'content-type': 'application/json; charset=utf-8' });

		connection.query('SELECT DISTINCT executor FROM tarefas;', function(err, results){
			if(err){
				res.end(err);
			}

			res.end(JSON.stringify(results));
		});

	});
}