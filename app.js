var server = require('./bin/server'), cermai = new server();

cermai.connect(function(err, db) {
	if (err) console.log(err);
	
	//// INSTALATION CERMAI ////
	cermai.initCermai(cermai.app, db);
	cermai.run();
})