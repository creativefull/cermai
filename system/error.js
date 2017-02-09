function Error() {
	const color = require('colors/safe');

	this.error500 = function (err, req, res, next){
		var statusCode=(err.status || 500);
		res.status(statusCode);
	    res.render('cermai_page/error', {
			message: err.message,
			error: err
	    });
	}

	this.error404 = function(req, res, next) {
		var err = new Error ('Page Not Found');
		err.status = 404;
		
		console.warn(color.yellow('Not Found : '+ req.url));
		res.status(404).render('cermai_page/404');
	}

	this.uncaughtException = () => {
		const EventEmitter = require('events');
		const ee = new EventEmitter();
		process.on('uncaughtException', (err) => {
			console.log(color.red(`Cermai Error: ${err}`))
		})
	}
}

module.exports = Error;