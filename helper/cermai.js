function CermaiHelper() {
	this.example = function(req,res,next) {
		return res.send("You call example helper :)");
	}
}
module.exports = CermaiHelper;