module.exports = function(app){

	app.get('/teste', function(req, res){

		var connection = app.infra.connectionFactory();

		console.log(connection);
	})
}