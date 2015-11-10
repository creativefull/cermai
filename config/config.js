function config() {
	this.app = {
		host : 'localhost',
		port : 9000
	}

	this.connection = {
		host : 'localhost',
		port : 27017,
		db	: 'cermai',
		user : '',
		pwd : ''
	}
}
module.exports = config;