function CermaiHelper() {
	var config = require('../config.json');
	var moment = require('moment');
	moment.locale('id');

	this.example = function(req,res,next) {
		return res.send("You call example helper :)");
	}

	this.handleAjax = function(req,res, url) {
		var ref = req.headers['x-requested-with'];
		if (ref != 'XMLHttpRequest') {
			var hostname = '';
			if (config.app.port != 80) {
				hostname = req.protocol + '://' + config.app.host + ':' + config.app.port;
			} else {
				hostname = req.protocol + '://' + config.app.host;
			}
			return res.redirect(hostname + '/' + url + '#' + req.url)
		}
	}

	this.login = function(collection, data, req, cb) {
		collection.findOne(data, function(err, docs) {
			if (docs != null) {
				req.session.cermaiSession = docs;
				cb(null, true);
			}
			else {
				cb('Login Invalid', null);
			}
		});
	}

	this.logout = function(req, res, redirect) {
		req.session.destroy();
		return res.redirect(redirect.toString());
	}

	this.shortid = function(req,res,next) {
		var date = moment().format("YYMMDDHHmmss")
		var random = Math.ceil(Math.random()*100);
		var gabungan = date + random;
		var text = new Buffer(gabungan).toString("base64");
		text = text.slice(text.length-8).replace(/=/gi, "A");
		return text;
	}
}
module.exports = CermaiHelper;