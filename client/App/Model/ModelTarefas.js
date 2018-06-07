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
}