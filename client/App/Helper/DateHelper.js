class DateHelper{
	constructor(){
		throw new Error('Essa classe é um helper, não pode ser instanciada');
	}

	static tempoAtual(dados){

		if(Array.isArray(dados)){

			dados.forEach(item =>{
				if(item.tempo == null){
					let dataAtual = new Date();
					let entradaTarefa = new Date(item.horaEntrada);

					item.tempo = this.millisToHours(dataAtual - entradaTarefa);
					
				}
			});
		}else{
			if(dados.tempo == null){
				console.log(dados.id + '- Esse é o ID');
				let dataAtual = new Date();
				let entradaTarefa = new Date(dados.horaEntrada);

				dados.tempo = this.millisToHours(dataAtual - entradaTarefa);
				
			}
		}
		

		return dados;

		console.log(dados);
	}

	static millisToHours(millis){
		let minutos = Math.floor(millis / 60000);

		return {hour: Math.floor(minutos / 60), min: minutos % 60};
	}

	static incrementHour(){

		setInterval(() => {

			let container = document.querySelectorAll('.container--change');

			container.forEach(item =>{
				let valorMin = ++item.childNodes[2].textContent;

				if(item.childNodes[2].textContent.length == 1){
					item.childNodes[2].textContent = "0" + valorMin;
				}

				if(item.childNodes[2].textContent >= 60){
					let valorHour = item.childNodes[2].textContent++;

					if(item.childNodes[0].textContent == 1){
						item.childNodes[0].textContent = "0" + valorHour;
					}


					item.childNodes[0].textContent++;
					item.childNodes[2].textContent = '00';
				}
			});

		}, 600);
		
	}

	static diferencaDatas(entrada, saida){
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

			var queryTarefa = `${hora}:${objetoTarefa.minutos}:0`

		}

	static diaSemana(data){
		switch(data.getDay()){
			case 0:
				return 'Domingo'
			case 1:
				return 'Segunda-feira'
			case 2:
				return 'Terça-feira'
			case 3:
				return 'Quarta-feira'
			case 4:
				return 'Quinta-feira'
			case 5:
				return 'Sexta-feira'
			case 6:
				return 'Sábado'
		}

	}

	static nomeMes(data){
		let date = new Date();
		switch(data.getMonth()){
			case 0:
				return 'Janeiro'
			case 1:
				return 'Fevereiro'
			case 2:
				return 'Março'
			case 3:
				return 'Abril'
			case 4:
				return 'Maio'
			case 5:
				return 'Junho'
			case 6:
				return 'Julho'
			case 7:
				return 'Agosto'
			case 8:
				return 'Setembro'
			case 9:
				return 'Outubro'
			case 10:
				return 'Novembro'
			case 11:
				return 'Dezembro'
		}

	}

	//forEach na lista, separar por datas
	//

	static queryDate(data){
		if(data.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)){
			return 'Hoje'
			// return `Hoje, ${data.getDate()} de ${this.nomeMes(data)} de ${data.getFullYear()}`;
		}else{
			return `${this.diaSemana(data)}, ${data.getDate()} de ${this.nomeMes(data)} de ${data.getFullYear()}`;
		}
	}
}