function Welcome(db) {
	this.index = function(req,res,next) {
		res.render('welcome');
	}
}
module.exports = Welcome;