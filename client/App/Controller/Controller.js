class ControllerApp{

	constructor(){
		this.model = new Proxy(new ModelTarefas(), {
			get: function(target, prop, receiver){
				console.log(`Acessando Prop: ${prop}`);

				return Reflect.get()
			}
		});

		this.view = new View();
		this.feedContainer = document.querySelector('.feed__mcontainer');
	}

	carregaTarefas(){
		let request = new XMLHttpRequest();

		request.onreadystatechange = () => {

			if(request.readyState == 4){
				if(request.status == 200){
					console.log(this.model);
					this.model.adiciona(JSON.parse(request.responseText));

					console.log(this.model.tarefas);
				}else{
					console.log(request.statusText);
				}
			}
		}

		request.open('GET', 'http://localhost:3000/tarefas');
		request.send();

	}
}