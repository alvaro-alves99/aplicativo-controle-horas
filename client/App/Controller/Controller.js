class ControllerApp{

	constructor(){
		const $ = document.querySelector.bind(document);
		let self = this;
		this.view = new View();
		this.feedContainer = document.querySelector('.feed__mcontainer');
		this.logado = 'Calebe';
		this.model = ProxyFactory.Model(self, this.logado);
	}

	carregaTarefas(filtros=false){

		if(!filtros){
			Ajax.get('http://localhost:3000/tarefas')
			.then( (data) => {
				let grupoTarefas = this.AgrupaPorData(DateHelper.tempoAtual(data));

				this.model.adiciona(grupoTarefas);
				DateHelper.incrementHour();

				//FIM DA TELA DE CARRGAMENTO
			}).catch( (erro) => console.log(erro));
		}else{

			if(filtros.executor == undefined)filtros.executor = '';
			if(filtros.periodo == undefined)filtros.periodo = '';


			Ajax.get(`http://localhost:3000/tarefas?executor=${filtros.executor}&periodo=${filtros.periodo}`)
			.then( (data) => {

				if(data != false){

					console.log('DATA');
					console.log(data);

					let grupoTarefas = this.AgrupaPorData(DateHelper.tempoAtual(data));

					console.log(grupoTarefas);

					console.log('MODEL');
					this.model.esvazia();
					
					this.model.adiciona(grupoTarefas);

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

	ModalFinalizarTarefa(id, horaEntrada){
		let containerModal = document.querySelector('.adicionar__mcontainer');
		this.view.enableFinalizaTarefa(containerModal, id, horaEntrada);
	}

	finalizarTarefa(event, idTarefa, ele){
		event.preventDefault();
		let form = ele.parentNode.parentNode;

		console.log(form.horaEntrada.value);

		let stringData = `${form.horaSaida.value}:${form.minutosSaida.value}`;

		console.log(stringData);
		Ajax.send('PUT', 'http://localhost:3000/tarefas', {id: idTarefa, horaSaida:stringData, horaEntrada: form.horaEntrada.value })
			.then( (dados) => {
					this.model._alteraTarefa(idTarefa, 'horaSaida', stringData);
					setTimeout(()=>{
						this.carregaTarefas();
					}, 600)
					//TELA DE CARREGAMENTO
					this.view.alert('Sucesso!', 'Sua tarefa foi finalizada');
					
			}).catch(erro => console.log(erro));
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

				console.log(DateHelper.tempoAtual(json));
				this.model._adicionaTarefa(DateHelper.tempoAtual(json));
				this.view.alert('Sucesso!', 'Sua tarefa foi adicionada');

				setTimeout(() => {
					this.carregaTarefas();
				}, 600);
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

				console.log(dados);

				if(dados.hora == 0 && dados.minutos == 0){
					this.view.alert('Erro', 'Não foram encontradas tarefas para esse período');
				}else{
					$('.horas-valor').textContent = dados.hora;
				}
				
			});
		}


	}

	AgrupaPorData(array){

		console.log(array);

		array.forEach(item => {
			item.data = item.horaEntrada.split(' ')[0];
		});

		console.log(array);

		let superDatas = [[]];

		array.forEach(item => {
			if(superDatas[superDatas.length - 1].length == 0){
				superDatas[superDatas.length - 1].push(item);
			}
			if(superDatas[superDatas.length - 1][superDatas[superDatas.length - 1].length - 1].data == item.data){
				superDatas[superDatas.length - 1].push(item);
			}else{
				superDatas.push([item]);
			}
		});

		return superDatas;

	}
}