class ControllerApp{

	constructor(){
		let self = this;
		this.view = new View();
		this.feedContainer = document.querySelector('.feed__mcontainer');
		this.logado = 'Calebe';
		this.model = ProxyFactory.Model(self, this.logado);
	}

	carregaTarefas(){
		let request = new XMLHttpRequest();

		request.onreadystatechange = () => {

			if(request.readyState == 4){
				if(request.status == 200){
					console.log(this.model);
					this.model.adiciona(JSON.parse(request.responseText));
				}else{
					console.log(request.statusText);
				}
			}
		}

		request.open('GET', 'http://localhost:3000/tarefas');
		request.send();

	}

	ModalAdicionaToggle(dismiss){

		let containerModal = document.querySelector('.adicionar__mcontainer');

		if(dismiss || containerModal.innerHTML){
			containerModal.innerHTML = '';
		}else{
			this.view.modalAdiciona(containerModal, this.logado);
		}

	}

	finalizarTarefa(id){

		let request = new XMLHttpRequest();

		request.onreadystatechange = () =>{
			if(request.readyState == 4){
				if(request.status == 200){

				}
			}
		}

		request.open('PUT', 'http://localhost:3000/tarefas');
		request.send();
	}
}