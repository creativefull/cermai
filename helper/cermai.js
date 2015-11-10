function CermaiHelper() {
	var conf = require('../config/config'), config = new conf();

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
}
module.exports = CermaiHelper;