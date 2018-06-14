class ProxyFactory{
	static Model(self, logado){
		return new Proxy(new ModelTarefas(), {
			get: function(target, prop, receiver){
				if(typeof target[prop] == 'function'){
					return function(){
						console.log(target['tarefas']);

						Reflect.apply(target[prop], target, arguments);

						self.view.atualiza(target['tarefas'], self.feedContainer, logado);
					}
				}else{
					return Reflect.get(target, prop, receiver);
				}

			}
		});
	}

}