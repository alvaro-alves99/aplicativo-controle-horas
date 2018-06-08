module.exports = function(app){

		return app.post('/tarefas', function(req, res){

		var bodyParser = require('body-parser');

		res.setHeader('Content-Type', 'application/json');

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false}));

		var date = new Date();
		date.setHours(1);
		console.log(date.toTimeString());

		var dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${req.body.horaEntrada}:00`;

		console.log(dateString);

		var connection = app.infra.connectionFactory();

		// var query = 'INSERT INTO tarefas (numJob, nome, analista, executor) VALUES (' + req.body.numJob + ', ' + '\"' + req.body.nome + '\"' + ', ' + '\"' + req.body.analista + '\"' + ', ' + '\"' + req.body.executor + '\"' + ')';

		console.log('ESSA É REQ BODY');
		console.log(req.body);

		var query = `INSERT INTO tarefas (numJob, nome, analista, executor, horaEntrada) VALUES ('${req.body.numJob}', "${req.body.nome}", "${req.body.analista}", "${req.body.executor}", "${dateString}")`;

		connection.query(query, function(err, results){

			console.log(err);
			console.log(results);
			console.log('deu tudo certo');

			res.redirect('/tarefas');
		});
       
	});
}