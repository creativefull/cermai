var server = require('./bin/server'), cermai = new server();


cermai.connect(function(err, db) {
	if (err) console.log(err);

	///// INSTALL CERMAI HELPER ///////
	cermai.initHelper(cermai.app);
	///// INSTALL CERMAI SESSION //////
	cermai.initSession(cermai.app);
	//// INSTALATION CERMAI ////
	cermai.initCermai(cermai.app, db);
	//// RUN CERMAI APP /////
	cermai.run();
})