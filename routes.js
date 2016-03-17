module.exports = exports = function(cermai, db) {
	var WelcomeHandler = require('./routes/welcome'), Welcome = new WelcomeHandler(db);

	cermai.get('/', Welcome.index);
}