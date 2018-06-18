module.exports = function(app){

	return app.put('/tarefas', function(req, res){

		var connection = app.infra.connectionFactory();

		console.log('REQ BODY');
		console.log(req.body);

		var date = new Date();
		var dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${req.body.horaSaida}:00`;

		console.log(req.body.horaEntrada)


		var updateQuery = 'UPDATE tarefas SET horaSaida = ' + '\"' + dateString + '\"' + ' WHERE id = ' + req.body.id;

		var updateQuery = `UPDATE tarefas SET horaSaida="${dateString}", tempo="${diferencaDatas(req.body.horaEntrada, dateString)}" WHERE ID="${req.body.id}"`

		connection.query(updateQuery, function(err, results){
			console.log(err);
			console.log(results);
		});


		function diferencaDatas(entrada, saida){
			var horaEntrada = new Date(entrada);
			var horaSaida = new Date(saida);

			var minutos = (horaSaida - horaEntrada)/60000;

			var hora = Math.floor(minutos / 60);
			var restoMinutos = minutos % 60;

			var objetoTarefa = {"hora": hora,"minutos": restoMinutos};

			if(objetoTarefa.minutos >= 60){
				objetoTarefa.hora += Math.floor(objetoTarefa.minutos / 60);
				objetoTarefa.minutos %= 60;
			}

			return `${hora}:${objetoTarefa.minutos}:0`;

		}
	});
}