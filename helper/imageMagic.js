var im = require('imagemagick');
function imageMagic() {
	this.convert = function(options, cb) {
		if (options != undefined) {
			im.convert([options.ori, '-resize', options.dimensi, options.result], function(err, hasil) {
				if (err) {
					cb(err, null);
				}
				else {
					cb(null, "Berhasil");
				}
			});			
		}
		else {
			cb("Error Opsi Belum Ada", null);
		}
	}
}
module.exports = imageMagic;