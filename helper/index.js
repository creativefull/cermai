module.exports = exports = function(req,res,next) {
	// -- File Autoload -- //
	var configHelper = require('../helper.json');
	var fs = require('fs');
	var path = require('path');

	var autoload = configHelper.autoload || false;
	var helpers = configHelper.helper || [];
	if (autoload == true) {
		helpers = [];
		fs.readdir('./helper', function(err, files) {
			files.forEach(function(file) {
				if (file != 'index.js') {
					helpers.push(file.substring(0, parseInt(file.length-3)))
				}				
			})
			// -- iterating helpers -- 
			helpers.forEach(function(doc) {
				var helper = require('./' + doc);
				req[doc] = new helper;
			})
			next();
		})
	}
	else {
		// -- iterating helpers -- 
		helpers.forEach(function(doc) {
			var helper = require('./' + doc);
			req[doc] = new helper;
		})
		next();
	}
}