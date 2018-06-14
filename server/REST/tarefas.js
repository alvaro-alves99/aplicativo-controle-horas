module.exports = function(app){

		 return app.get('/tarefas', function(req, res){

			var mysql = require('mysql');

			var connection = app.infra.connectionFactory();

			res.writeHead(200, {'Content-Type': 'application/json'});


			connection.query((req.query.executor ? 'select * from tarefas WHERE executor=\'' + req.query.executor + '\'' : 'select * from tarefas'), function(err, results){

				if(req.query.periodo){

					var periodoFiltro = results.filter(function(item){
						if(new Date(item.horaEntrada).getMonth() == (req.query.periodo - 1)){
							return item;
						}
					});


					res.end(JSON.stringify(periodoFiltro));
				}

				res.end(JSON.stringify(results));
			});

	});
}