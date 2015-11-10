module.exports = exports = function(req,res,next) {
	// -- File Autoload -- //	
	var helpers = ['cermai', 'excel', 'imageMagic'];

	// -- iterating helpers -- 
	helpers.forEach(function(doc) {
		var helper = require('./' + doc);
		req[doc] = new helper;
	})
	next();
}