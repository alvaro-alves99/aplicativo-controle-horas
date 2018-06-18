class ModelTarefas{

	constructor(){
		this.tarefas = [];
	}

	adiciona(item){
		if(item instanceof Array){
			item.forEach((single) => {
				this.tarefas.push(single);
			});
		}else{
			this.tarefas.push(item)
		}
		
	}

	esvazia(){
		this.tarefas.length = 0;
	}

	_alteraTarefa(id, campo, valor){
		var tarefa = this.tarefas.filter(function(item){
			return item.id == id;
		});

		tarefa[0][campo] = valor;

		console.log(tarefa[0]);
	}

	_adicionaTarefa(tarefa){
		this.tarefas.push(tarefa);
	}
}