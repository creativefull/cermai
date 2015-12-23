function config() {
	this.app = {
		host : 'localhost',
		port : 9001
	}

	this.connection = {
		host : 'localhost',
		port : 27017,
		db	: 'cermai',
		user : '',
		pwd : '',
		// replica : 'cermai',
		// members : [{
		// 	host : 'localhost',
		// 	port : 20016
		// },
		// {
		// 	host : 'localhost',
		// 	port : 20017
		// }]
	}

	// this.redis = {
	// 	host : '10.4.1.107',
	// 	port : 6379,
	// 	db : 4,
	// 	pwd : 'redisledis'
	// }

	this.page = {
		login : '/login'
	}
}
module.exports = config;