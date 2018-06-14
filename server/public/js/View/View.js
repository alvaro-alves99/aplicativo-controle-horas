class View{

	constructor(){
		
	}

	atualiza(lista, container, logado){
		let bigString = '';

		console.log(typeof Array.from(lista));

		lista.forEach(function(item){
			bigString += `<div class="task-single">

				<div class="perfil-imagem">
					${item.executor == 'Calebe' ? '<img src="/assets/profile-1.jpeg">' : ''}
					${item.executor == 'Allan' ? '<img src="/assets/profile-2.jpeg">' : ''}
					${item.executor == 'Álvaro' ? '<img src="/assets/profile-3.jpeg">' : ''}
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
											${logado == item.executor && !item.horaSaida ? `<button onclick="Controller.finalizarTarefa(${item.id})" class="hora-saida-button">Finalizar Tarefa</button>` : ''}
											${logado != item.executor && !item.horaSaida ? '<span>Executando</span>' : ''}
											${item.horaSaida ? '<span>13:20</span>' : ''}
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>`;

		});

		container.innerHTML = bigString;

	}

	modalAdiciona(container, logado){
		let conteudoModal = `<div class="form__adicionar" style="opacity:1;">
				<span class="close-modal" onclick="Controller.ModalAdicionaToggle('dismiss')">X</span>
				<h3>Adicionar Tarefa</h3>
				<form action="http://localhost:3000/tarefas" method="post">
					<div class="form-item">
						<label for="nome-tarefa">Nome tarefa</label>
						<input id="nome-tarefa" name="nome" type="text">
					</div>

					<div class="form-item">
						<label for="numero-tarefa">Número Job</label>
						<input id="numero-tarefa" name="numJob" type="number">
					</div>

					<div class="form-item horario-form">
						<label for="hora-entrada-tarefa">Horário Entrada</label><br>
						<select name="horaEntrada" id="hora-entrada">
							<option value="" disabled>Hora</option>
							<option value="14:32" selected>Hora</option>
						</select>

						<select>
							<option value="" disabled>Minutos</option>
							<option value="14:32" selected>Minutos</option>
						</select>
					</div>

					<div class="form-item">
						<label for="analista">Analista</label>
						<select id="analista" name="analista">
							<option value="" disabled selected>Selectione o analista</option>
							<option value="Kim">Kim</option>
							<option value="Kim">Kim</option>
							<option value="Kim">Kim</option>
							<option value="Kim">Kim</option>
						</select>
					</div>

					<input style="display:none;" type="text" name="executor" value="${logado}">

					<div class="form-item">
						<input class="submit-form" type="submit" value="Cadastrar">
					</div>
				</form>
			</div>`;

			container.innerHTML = conteudoModal;
			container.style.opacity="1";
	}
}