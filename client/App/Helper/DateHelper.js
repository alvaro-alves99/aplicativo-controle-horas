class DateHelper{
	constructor(){
		throw new Error('Essa classe é um helper, não pode ser instanciada');
	}

	static tempoAtual(array){
		array.forEach(item =>{
			if(item.tempo == null){
				console.log(item.id + '- Esse é o ID');
				let dataAtual = new Date();
				let entradaTarefa = new Date(item.horaEntrada);

				item.tempo = this.millisToHours(dataAtual - entradaTarefa);
				
			}
		});

		return array;

		console.log(array);
	}

	static millisToHours(millis){
		let minutos = Math.floor(millis / 60000);

		return {hour: Math.floor(minutos / 60), min: minutos % 60}
	}

	static incrementHour(){

		setInterval(() => {

			let container = document.querySelectorAll('.container--change');

			container.forEach(item =>{
				item.childNodes[2].textContent++;

				if(item.childNodes[2].textContent >= 60){
					item.childNodes[0].textContent++;
					item.childNodes[2].textContent = 0;
				}
			});

		}, 1000);
		
	}
}