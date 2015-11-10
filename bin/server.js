var express = require('express'), app = express();
var conf = require('../config/config'), config = new conf();
var mongoDB = require('mongodb').MongoClient;
var path = require('path');
var helper = require('../helper');
// ## ROUTES INIT
var routes = require('../routes');

function CermaiJs() {
	this.app = app;
	this.run = function() {
		app.listen(config.app.port, config.app.host, function() {
			console.log("Application Running On " + config.app.host + ":" + config.app.port);
		});
	}

	this.connect = function(cb) {
		if (config.connection.user == '' && config.connection.pwd == '') {
			mongoDB.connect('mongodb://' + config.connection.host + ':' + config.connection.port + '/' + config.connection.db, function(err, db) {
				cb(err, db);
			})
		}
		else {
			mongoDB.connect('mongodb://' + config.connection.user + ':' + config.connection.pwd + '@' + config.connection.host + ':' + config.connection.port + '/' + config.connection.db, function(err, db) {
				cb(err, db);
			})			
		}
	}
	this.initCermai = function(cermai, db) {
		////////// AUTOLOAD HELPER ////////////////
		cermai.use(helper);
		// ## SETTING VIEW ENGINE & CSS PRECOMPILER
		cermai.set('views', path.join(__dirname, '/../views'));
		cermai.set('view engine', 'jade');
		cermai.use(require('stylus').middleware(path.join(__dirname, '../public')));
		cermai.use(express.static(path.join(__dirname, '/../public')));
		
		// ## PANGGIL ROUTES
		routes(cermai, db);
	}
}

module.exports = CermaiJs;