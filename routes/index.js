module.exports = exports = function(cermai, db) {
	cermai.get('/', function(req,res,next) {
		req.cermai.example(req,res,next);
	})
}