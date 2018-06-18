class Ajax{
	static get(endereco){

		return new Promise((resolve, reject) => {

			let request = new XMLHttpRequest();

			request.onreadystatechange = () => {

				if(request.readyState == 4){
					if(request.status == 200){
						resolve(JSON.parse(request.responseText));
					}else{
						reject(console.log(request.statusText));
					}
				}
			}

			request.open('GET', endereco);
			request.send();
			});

	}

	static send(method, endereco, dados){


		return new Promise((resolve, reject) => {

			let request = new XMLHttpRequest();

			request.onreadystatechange = () => {

				if(request.readyState == 4){
					console.log('STATUS: ' + request.status);
					if(request.status == 200){
						console.log('deu certo');
					}else{
						reject(console.log(request.statusText));
					}
				}
			}

			request.open(method, endereco, true);
			request.setRequestHeader('Content-type', 'application/json');
			request.setRequestHeader('Accept', 'application/json');

			var parsed = JSON.stringify(dados);
			console.log(parsed);
			
			resolve(request.send(parsed));

		});

	}
}