module.exports = exports = function(req,res,next) {
	req.user = req.session.cermaiSession;
	next();
}