class View{

	constructor(){
		
	}

	atualiza(model, container){
		let bigString = '';

		model.forEach(function(item){
			bigString += `<div class="task-single">

				<div class="perfil-imagem">
					<img src="imagens/profile-1.jpeg">
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
									<strong class="hora-entrada">Hora Entrada: </strong>
									<span class="hora-entrada-info">${item.horaEntrada}</span><br>
								</div>
						
								<div class="hora-saida-container">
									<strong class="hora-saida">Hora Saída: </strong>

									<div class="botao-saida-container">
										<button class="hora-saida-button">Finalizar Tarefa</button>
										<span>13:20</span>
										<span>Executando</span>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>`;
		});

		console.log(bigString);

		container.innerHTML = bigString;

		return bigString;
	}
}