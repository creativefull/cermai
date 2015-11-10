function Error() {
	this.error500 = function (err, req, res, next){
		var statusCode=(err.status || 500);
		res.status(statusCode);
	    res.render('cermai_page/error', {
	      message: err.message,
	      error: err
	    });
	}

	this.error404 = function(req, res, next) {
		var err = new Error ('Page Not Found');// {message:'Are you lost ? '};
		err.status = 404;
		
		console.log ('Not Found : '+err.message);
		return next(err);
	}
}

module.exports = Error;