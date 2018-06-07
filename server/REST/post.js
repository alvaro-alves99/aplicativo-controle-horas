module.exports = function(app){

		return app.post('/tarefas', function(req, res){

		var bodyParser = require('body-parser');

		res.setHeader('Content-Type', 'application/json');

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false}));

		var connection = app.infra.connectionFactory();

		// var query = 'INSERT INTO tarefas (numJob, nome, analista, executor) VALUES (' + req.body.numJob + ', ' + '\"' + req.body.nome + '\"' + ', ' + '\"' + req.body.analista + '\"' + ', ' + '\"' + req.body.executor + '\"' + ')';

		console.log('ESSA É REQ BODY');
		console.log(req.body);

		var query = `INSERT INTO tarefas (numJob, nome, analista, executor, horaEntrada) VALUES ('${req.body.numJob}', "${req.body.nome}", "${req.body.analista}", "${req.body.executor}", "${req.body.horaEntrada}")`;

		connection.query(query, function(err, results){

			console.log(err);
			console.log(results);
			console.log('deu tudo certo');
		});
       
	});
}