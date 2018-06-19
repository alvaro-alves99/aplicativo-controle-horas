module.exports = function(app){

	return app.get('/horas-executor', function(req, res){

		var connection = app.infra.connectionFactory();

		connection.query('SELECT horaEntrada, horaSaida, id FROM tarefas WHERE executor="' + req.query.executor + '" AND horaSaida IS NOT NULL;', function(err, results){

			if(err){
				res.end(JSON.stringify(err));
			}

			// res.end(converteData(somaHoras));
			// res.end(JSON.stringify(calculaData(results)));

			if(!req.query.executor){
				res.end(JSON.stringify({"erro": "executor nao especificado como parametro GET"}));
			}

			if(req.query.periodo){

				var periodoFiltro = results.filter(function(item){
					if(new Date(item.horaEntrada).getMonth() == (req.query.periodo - 1)){
						return item;
					}
				});


				console.log('PERIODO FILTRO');
				console.log(periodoFiltro);
			
				res.end(JSON.stringify(calculaData(periodoFiltro)));	
			}


			res.end(JSON.stringify(calculaData(results)));

		});

		function calculaData(results){

			var resultados = results.map(function(task){
				var horaEntrada = new Date(task["horaEntrada"]);
				var horaSaida = new Date(task["horaSaida"]);

				var segundos = (horaSaida - horaEntrada)/1000;
				var minutos = segundos/60;

				var hora = Math.floor(minutos / 60);
				var restoMinutos = minutos % 60;

				return {"hora": hora,"minutos": restoMinutos, id: task["id"]};
			});

			var resultadoFinal = {
				"hora": 0,
				"minutos":0,
			};

			resultados.forEach(function(item){
				resultadoFinal.hora += item.hora;
				resultadoFinal.minutos += item.minutos;
			});

			if(resultadoFinal.minutos >= 60){
				resultadoFinal.hora += Math.floor(resultadoFinal.minutos / 60);
				resultadoFinal.minutos %= 60;
			}

			return resultadoFinal;
			
		}	

	});
}