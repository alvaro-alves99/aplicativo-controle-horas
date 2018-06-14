class ControllerApp{

	constructor(){
		const $ = document.querySelector.bind(document);
		let self = this;
		this.view = new View();
		this.feedContainer = document.querySelector('.feed__mcontainer');
		this.logado = 'Allan';
		this.model = ProxyFactory.Model(self, this.logado);
	}

	carregaTarefas(filtros=false){

		if(!filtros){
			Ajax.get('http://localhost:3000/tarefas')
			.then( (data) => {
				console.log(DateHelper.tempoAtual(data));
				this.model.adiciona(DateHelper.tempoAtual(data));
				DateHelper.incrementHour();

				//FIM DA TELA DE CARREGAMENTO
			}).catch( (erro) => console.log(erro));
		}else{

			if(filtros.executor == undefined)filtros.executor = '';
			if(filtros.periodo == undefined)filtros.periodo = '';

			Ajax.get(`http://localhost:3000/tarefas?executor=${filtros.executor}&periodo=${filtros.periodo}`)
			.then( (data) => {

				if(data != false){
					this.model._esvazia();
					this.model.adiciona(DateHelper.tempoAtual(data));
					document.querySelector('.filtro__title').textContent=`${filtros.executor == '' ? 'Geral' : filtros.executor} - ${filtros.periodo == '' ? 'Geral' : filtros.periodo}`;
					this.ModalAdicionaToggle('dismiss');
					DateHelper.incrementHour();
				}else{
					this.view.alert('Erro', 'Não foram encontradas tarefas para esse período');
				}

			}).catch( (erro) => console.log(erro));
		}
		
	}

	ModalAdicionaToggle(dismiss){

		let containerModal = document.querySelector('.adicionar__mcontainer');

		if(dismiss || containerModal.innerHTML){
			containerModal.innerHTML = '';
		}else{
			this.view.modalAdiciona(containerModal, this.logado);
		}

	}

	ModalFinalizarTarefa(id){
		let containerModal = document.querySelector('.adicionar__mcontainer');
		this.view.enableFinalizaTarefa(containerModal, id);
	}

	finalizarTarefa(event, idTarefa, ele){
		event.preventDefault();
		let form = ele.parentNode.parentNode;

		let stringData = `${form.horaEntrada.value}:${form.minutosEntrada.value}`;

		console.log(stringData);
		Ajax.send('PUT', 'http://localhost:3000/tarefas', {id: idTarefa, horaSaida:stringData})
			.then( (dados) => {
					this.model._alteraTarefa(idTarefa, 'horaSaida', stringData);
					//TELA DE CARREGAMENTO
					this.view.alert('Sucesso!', 'Sua tarefa foi finalizada');
					
			}).catch( (erro) => console.log(erro));
	}

	carregaInfoPerfil(){
		Ajax.get('http://localhost:3000/horas-executor?executor=' + this.logado)
			.then((result) => {
			
			let horaContainer = document.querySelector('.hora__info');
			// let minutoContainer = document.querySelector('.minutos__info');

			horaContainer.textContent = result.hora + 'h';
			// minutoContainer.textContent = result.minutos + ' Minutos';
		});

	}

	filtraPorPeriodo(event){

		Ajax.get(`http://localhost:3000/horas-executor?executor=${this.logado}&periodo=${event.target.value}`)
			.then( dados => {
				console.log(dados==false)

				if(dados.hora == 0 && dados.minutos == 0){
					$('.hora__info').style.color='red';
					$('.hora__info').textContent = dados.hora + 'h';
					$('.mensagem-hora').textContent = 'Não Foram encontrada tarefas nesse período';
				}else{
					$('.hora__info').style.color='green';
					$('.hora__info').textContent = dados.hora + 'h';
					$('.mensagem-hora').textContent = 'Você não estourou suas horas';
				}
				
			});
	}

	adicionarTarefa(event){
		event.preventDefault();
		let form = event.target.parentNode.parentNode;

		let json = {nome: form.nome.value, numJob: form.numJob.value, horaEntrada: `${form.horaEntrada.value}:${form.minutosEntrada.value}`, executor:this.logado, analista:form.analista.value, tempo:null};

		Ajax.send('POST', 'http://localhost:3000/tarefas', json)
			.then(dados => {
				// TAREFA ADICIONADA COM SUCESSO
				this.model._adicionaTarefa(json);
				this.view.alert('Sucesso!', 'Sua tarefa foi adicionada');
				setTimeout(() => {
					this.carregaTarefas();
				}, 1000);
			});

	}

	modalFiltrar(param=''){

		this.view.enableModalFiltrar();

		if(param == 'perfil'){
			this.view.enableModalFiltrar(param, this.logado);

		}
	}

	filtrarTarefas(event, mode=''){
		event.preventDefault();

		let form = event.target.parentNode.parentNode;

		this.carregaTarefas({executor:form.executor.value, periodo:form.periodo.value});

		if(mode == 'perfil'){

			Ajax.get(`http://localhost:3000/horas-executor?executor=${this.logado}&periodo=${form.periodo.value}`)
			.then( dados => {
				console.log(dados==false)

				if(dados.hora == 0 && dados.minutos == 0){
					$('.horas__botaoadiciona').textContent = 'Não Foram encontrada tarefas nesse período';
				}else{
					$('.horas-valor').textContent = dados.hora;
				}
				
			});
		}


	}
}