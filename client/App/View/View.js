class View{

	constructor(){
		
	}

	atualiza(Grupolista, container, logado){
		let bigString = '';

		console.log(Grupolista);

		if(Grupolista.length == 0){
			container.innerHTML = '';
			return;
		}

		if(Array.isArray(Grupolista[0])){

			Grupolista.forEach( lista => {

				let containerTempo = document.createElement('div');
				containerTempo.classList.add('grupo-periodo');

				let titulo = document.createElement('h2');
				titulo.classList.add('titulo-periodo');

				titulo.textContent = `${DateHelper.queryDate(new Date(lista[0].horaEntrada))}`;

				let containerFeed = document.createElement('div');
				containerFeed.classList.add('grupo-periodo-inner');

				containerTempo.appendChild(titulo);
				containerTempo.appendChild(containerFeed);


				lista.forEach(function(item){


					if(typeof item.tempo == 'object'){
						var hourParsed = item.tempo.hour.toString().length == 1 ? `0${item.tempo.hour}` : item.tempo.hour;
						var minParsed = item.tempo.min.toString().length == 1 ? `0${item.tempo.min}` : item.tempo.min;
					}


					containerFeed.innerHTML += `<div class="task-single">

					<div class="first_division">
						<div class="first__inner">
							<span class="job-line">Job:&nbsp;&nbsp;<strong>${item.nome}</strong></span><br>

							<span class="analista-line">Analista:&nbsp;&nbsp;<strong>${item.analista}</strong></span>
						</div>
						<div class="tempo__inner">
							<span>Tempo</span>
							<span>
								${typeof item.tempo == 'string' ? item.tempo.substr(0, 5) : `
									<span class="container--change"><span class="valor-hour">${item.tempo.hour}</span>:<span class="valor-min">${item.tempo.min}</span></span>									
								`}
							</span>
						</div>
					</div>
				
					<div class="second_division">
						<div class="second__inner">
							<span class="entrada_second">Entrada:&nbsp;&nbsp;<strong class="hour_second"> ${item.horaEntrada.split(' ')[1].substr(0, 5)}</strong></span>

							<span class="saida_second">Saída: <strong class="hour_saida">
							${typeof item.horaSaida == 'string' ? item.horaSaida.split(' ')[1].substr(0, 5) : item.horaSaida}
							</strong></span> 
						</div>
					</div>

					<div class="third-division">
						<div class="info_third">
							${item.executor == 'Calebe' ? '<img class="profile-img" src="imagens/profile-1.jpeg">' : ''}
							${item.executor == 'Allan' ? '<img class="profile-img" src="imagens/profile-2.jpeg">' : ''}
							${item.executor == 'Álvaro' ? '<img class="profile-img" src="imagens/profile-3.jpeg">' : ''}
							<span class="name_third">${item.executor}</span>
						</div>

						<div class="button_pause__third">
							<div class="button_pause_inner">
								<img src="imagens/pause.png" alt="">
								<span>Em Andamento</span>
							</div>
						</div>

					</div>
				</div>`;

					container.appendChild(containerTempo);

					// console.log(containerFeed);

				});

		});



		}

		if(!Array.isArray(Grupolista[0])){

			let containerTempo = document.createElement('div');
			containerTempo.classList.add('grupo-periodo');

			let titulo = document.createElement('h2');

			console.log(Grupolista);

			titulo.textContent = `${DateHelper.queryDate(new Date(Grupolista[0].horaEntrada))}`;

			let containerFeed = document.createElement('div');
			containerFeed.classList.add('grupo-periodo-inner');

			containerTempo.appendChild(titulo);
			containerTempo.appendChild(containerFeed);

			Grupolista.forEach(function(item){


				if(typeof item.tempo == 'object'){
					var hourParsed = item.tempo.hour.toString().length == 1 ? `0${item.tempo.hour}` : item.tempo.hour;
					var minParsed = item.tempo.min.toString().length == 1 ? `0${item.tempo.min}` : item.tempo.min;
				}


				containerFeed.innerHTML += `<div class="task-single">

					<div class="perfil-imagem">
						${item.executor == 'Calebe' ? '<img src="imagens/profile-1.jpeg">' : ''}
						${item.executor == 'Allan' ? '<img src="imagens/profile-2.jpeg">' : ''}
						${item.executor == 'Álvaro' ? '<img src="imagens/profile-3.jpeg">' : ''}
					</div>
				
					<section class="conteudo-master">

						<div class="texto">
							<span><strong>${item.executor}</strong> começou uma nova tarefa:</span>
						</div>

						<div class="task-conteudo">
							<div class="nome-task">
								<strong class="num-job">${item.numJob}</strong>
								<span class="nome-job">${item.nome}</span>
							</div>

							<div class="info-task">

								<div class="analista-info">
									<strong class="analista">Analista: </strong>
									<span class="nome-analista">${item.analista}</span>
								</div>

								<div class="hora-info">
									<div class="hora-entrada-container">
										<strong class="hora-entrada">Hora Entrada: </strong><br>
										<span class="hora-entrada-info">${item.horaEntrada}</span><br>
									</div>
							
									<div class="hora-saida-container">
										<strong class="hora-saida">Hora Saída: </strong>

										<div class="botao-saida-container">
												${logado == item.executor && !item.horaSaida ? `<button onclick="Controller.ModalFinalizarTarefa(${item.id}, '${item.horaEntrada}')" class="hora-saida-button">Finalizar Tarefa</button>` : ''}
												${logado != item.executor && !item.horaSaida ? '<span>Executando</span>' : ''}
												${item.horaSaida ? `<span>${item.horaSaida}</span>` : ''}
										</div>
										
									</div>

									<div class="hora-entrada-container">
										<strong class="hora-entrada">Tempo: </strong><br>
										<span class="hora-entrada-info">${typeof item.tempo == 'string' ? item.tempo.substr(0, 5) : 
											`<span class="container--change"><span class="horas--change">${hourParsed}</span>:<span class="minutos--change">${minParsed}</span></span>
											`}</span><br>
									</div>

								</div>
							</div>
						</div>
					</section>
				</div>`;

				container.appendChild(containerTempo);

				// console.log(containerFeed);

				});
		}

		

		

		// container.innerHTML = bigString;

	}

	modalAdiciona(container, logado){
		var data = new Date();
		var string = data.getMinutes().toString();
		if(string.length == 1) string = '0' + string;
		let conteudoModal = `<div class="form__adicionar" style="opacity:1;">
				<div class="top__form">
					<span class="close-modal" onclick="Controller.ModalAdicionaToggle('dismiss')">X</span>
					<h3>Cadastrar uma nova tarefa</h3>
				</div>
				<form action="http://localhost:3000/tarefas" method="post">
					<div class="form-item">
						<label for="nome-tarefa">Nome Job</label>
						<input id="nome-tarefa" name="nome" type="text" placeholder="Escreva o nome do Job">
					</div>

					<div class="form-item">
						<label for="numero-tarefa">Número Job</label>
						<input id="numero-tarefa" name="numJob" type="number" placeholder="Escreva o número do Job">
					</div>

					<div class="form-item horario-form">
						<label for="hora-entrada-tarefa">Horário Entrada</label>
						<select name="horaEntrada" id="hora-entrada">
							<option value="${data.getHours()}" selected>${data.getHours()}h</option>
							<option value="1">01</option>
							<option value="2">02</option>
							<option value="3">03</option>
							<option value="4">04</option>
							<option value="5">05</option>
							<option value="6">06</option>
							<option value="7">07</option>
							<option value="8">08</option>
							<option value="9">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
							<option value="14">14</option>
							<option value="15">15</option>
							<option value="16">16</option>
							<option value="17">17</option>
							<option value="18">18</option>
							<option value="19">19</option>
							<option value="20">20</option>
							<option value="21">21</option>
							<option value="22">22</option>
							<option value="23">23</option>
							<option value="24">24</option>
						</select>

						<select name="minutosEntrada">
							<option value="" disabled>Minutos</option>
							<option value="${data.getMinutes()}" selected>${string}min</option>
							<option value="00">00</option>
							<option value="05">05</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
							<option value="25">25</option>
							<option value="30">30</option>
							<option value="35">35</option>
							<option value="40">40</option>
							<option value="45">45</option>
							<option value="50">50</option>
							<option value="55">55</option>
						</select>
					</div>

					<div class="form-item">
						<label for="analista">Analista</label>
						<select id="analista" name="analista">
							<option value="" disabled selected>Escolha o analista</option>
							<option value="Kim">Kim</option>
							<option value="Andresa">Andresa</option>
							<option value="Karine">Karine</option>
							<option value="Victor">Victor</option>
						</select>
					</div>

					<div class="form-item button-item">
						<input class="submit-form" type="submit" value="Criar tarefa" onclick="Controller.adicionarTarefa(event)">
					</div>
				</form>
			</div>`;

			container.innerHTML = conteudoModal;
			container.style.opacity="1";
	}



	enableFinalizaTarefa(container, id, horaEntrada){

		var hora = (new Date(horaEntrada));

		var data = new Date();
		var string = data.getMinutes().toString();
		if(string.length == 1) string = '0' + string;
		let conteudo = `<div class="form__adicionar" style="opacity:1;">
				<span class="close-modal" onclick="Controller.ModalAdicionaToggle('dismiss')">X</span>
				<h3>Finalizar Tarefa</h3>
				<form action="http://localhost:3000/tarefas">
					<div class="form-item horario-form">
						<input name="horaEntrada" type="text" value='${hora}' style="display:none;" />
						<label for="hora-entrada">Horário Saída</label><br>
						<select name="horaSaida" id="hora-entrada">
							<option value="${data.getHours()}" selected>${data.getHours()}</option>
							<option value="1">01</option>
							<option value="2">02</option>
							<option value="3">03</option>
							<option value="4">04</option>
							<option value="5">05</option>
							<option value="6">06</option>
							<option value="7">07</option>
							<option value="8">08</option>
							<option value="9">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
							<option value="14">14</option>
							<option value="15">15</option>
							<option value="16">16</option>
							<option value="17">17</option>
							<option value="18">18</option>
							<option value="19">19</option>
							<option value="20">20</option>
							<option value="21">21</option>
							<option value="22">22</option>
							<option value="23">23</option>
							<option value="24">24</option>
						</select>

						<select name="minutosSaida">
							<option value="" disabled>Minutos</option>
							<option value="${data.getMinutes()}" selected>${string}</option>
							<option value="00">00</option>
							<option value="05">05</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
							<option value="25">25</option>
							<option value="30">30</option>
							<option value="35">35</option>
							<option value="40">40</option>
							<option value="45">45</option>
							<option value="50">50</option>
							<option value="55">55</option>
						</select>
					</div>

					<div class="form-item">
						<input class="submit-form" type="submit" value="Finalizar" onclick="Controller.finalizarTarefa(event, ${id}, this)">
					</div>
				</form>
			</div>`;

			container.innerHTML = conteudo;
			container.style.opacity="1";
	}

	alert(titulo, subtitulo){
		let conteudo = `<div class="modal__adicionar" style="opacity:1;">
				<div class="top__form top__alert">
					<span class="close-modal" onclick="Controller.ModalAdicionaToggle('dismiss')">X</span>
				</div>
				<div class="meio__modal">
					<img src="imagens/checked.png" alt="">
					<h3>${titulo}</h3>
				</div>
			</div>`;


		let container = document.querySelector('.adicionar__mcontainer');
		container.innerHTML = conteudo;
		container.style.opacity="1";
	}

	loading(){
		let conteudo = `<div class="modal__adicionar" style="opacity:1;">
				<span class="close-modal" onclick="Controller.ModalAdicionaToggle('dismiss')">X</span>
				<i class="fa fa-check" aria-hidden="true"></i>
				<input class="submit-form btn-alert-modal" type="submit" value="Finalizar" onclick="Controller.ModalAdicionaToggle('dismiss');">
			</div>`;


		let container = document.querySelector('.alert__mcontainer');
		container.innerHTML = conteudo;
		container.style.opacity="1";
	}

	enableModalFiltrar(param=false, logado){
		let conteudo = `<div class="form__adicionar" style="opacity:1;">
				<span class="close-modal" onclick="Controller.ModalAdicionaToggle('dismiss')">X</span>
				<h3>Filtrar Tarefas</h3>
				<form action="http://localhost:3000/tarefas">
					<div class="form-item horario-form">
						<label for="hora-entrada">Período:</label><br>
						<select id="periodo-filtro" name="periodo">
						<option value="" selected>Geral</option>
						<option value="1">Janeiro</option>
						<option value="2">Fevereiro</option>
						<option value="3">Março</option>
						<option value="4">Abril</option>
						<option value="5">Maio</option>
						<option value="6">Junho</option>
						<option value="7">Julho</option>
						<option value="8">Agosto</option>
						<option value="9">Setembro</option>
						<option value="10">Outubro</option>
						<option value="11">Novembro</option>
						<option value="12">Dezembro</option>
					</select>
					</div>

					<div class="form-item horario-form" ${param ? 'style="display:none;"' : ''}>
						<label for="hora-entrada">Executor:</label><br>
						<select id="executor-filtro" name="executor">
						${param ? `<option value="${logado}" selected></option>` : ''}
						<option value="" ${!param ? 'selected' : ''}>Geral</option>
						<option value="Allan">Allan</option>
						<option value="Calebe">Calebe</option>
						<option value="Álvaro">Álvaro</option>
						<option value="Vitor">Vitor</option>
					</select>
					</div>

					<div class="form-item">
						<input class="submit-form" type="submit" value="Filtrar" onclick="Controller.filtrarTarefas(event${param ? ",'perfil'" : ''})">
					</div>
				</form>
			</div>`;

		let container = document.querySelector('.alert__mcontainer');
		container.innerHTML = conteudo;
		container.style.opacity="1";
	}

	tabelasExport(dados, container){
		let bigString = ``;
		console.log(dados);
		console.log(container);

		let containerTable = document.createElement('div');
		containerTable.innerHTML = `
				<table>
					<thead style="color:red;">
						<tr>
							<td>Num Job</td>
							<td>Nome</td>
							<td>Cliente</td>
							<td>Hora entrada</td>
							<td>Hora saída</td>
							<td>Tempo</td>
						</tr>
					</thead>
					<tbody>

					</tbody>

				</table>
	
			`;

		dados.forEach(item => {
			let string = `
				<tr>
					<td>${item.numJob}</td>
					<td>${item.nome}</td>
					<td>${item.analista}</td>
					<td>${item.horaEntrada}</td>
					<td>${item.horaSaida}</td>
					<td>${item.tempo}</td>
				</tr>
			`


			containerTable.childNodes[1].childNodes[3].innerHTML += string;

		});

		container.appendChild(containerTable);

	}
}