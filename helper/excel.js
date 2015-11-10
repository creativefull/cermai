var excelExport = require('excel-export');
var xlsx_json = require('xlsx-to-json')
var _ = require('underscore');
var async = require ('async');

function ExcelHandler() {
	this.export = function(excel, res, cb) {
		if (excel.cols != undefined || excel.rows != undefined) {
			var hasil = excelExport.execute(excel);
			res.setHeader('Content-Type', 'application/vnd.openxmlformats');
			res.setHeader("Content-Disposition", "attachment; filename=" + excel.filename + ".xlsx");
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');  
			res.header('Access-Control-Allow-Headers', 'Content-Type');
			///////////////////////////////////// CONVERT TO FILE WITH BINARY /////////////////////////////////////
			//////////////////////////////////// DONT RES SEND OR RES JSON AGAIN /////////////////////////////////
			res.end(hasil, 'binary');
			cb(null, 'Exported as => ' + excel.filename + ".xlsx");
		}
		else {
			cb('Parameter Yang Dimasukkan Salah', null);
		}
	}
	
	//////////// PARSING EXCEL TO JSON AND SAVE TO MONGODB //////////////////////
	this.saveToMongo = function(nameFile, options, cb) {
		var collection = options.collection,
		columnDB = options.fieldDb,
		columnExcel = options.fieldExcel;
		type = options.type;
		var dataToInsert = [];
		var bulk = collection.initializeUnorderedBulkOp();
		var counter = 0;
		var tmpData = [];

		if (columnDB.length != columnExcel.length) {
			return cb('Kolom Database Dan Kolom Excel Tidak Valid Vroh :3', null)
		}
		async.parallel([
			function(cb) {
				collection.find().toArray(function(err, docs) {
					if (docs != null) {
						docs.forEach(function(doc) {
							delete doc._id;
							tmpData.push(doc);
						})
					}
					cb(null, tmpData);
				})
			}
		], function(err, hasil) {
			xlsx_json({
				input: nameFile,
				output: null
				// output: __dirname + '/../output.json'
			}, function(err, result) {
				if (err) {
					cb("error", {status : 'error', pesan : 'Use Valid Format'})
				}
				else {
					result.forEach(function(value, index) {
						if (value[options.notNull] != null) {
							var datane = {};
							for(x = 0; x < columnExcel.length; x++){
								var valueData = '';
								for (var Field in value) {
									if (columnDB[x]['type'] == 'string') {
										if (type == 'index') {
											valueData = _.values(value)[columnExcel[x]];
										}
										else {
											valueData = value[columnExcel[x]];
										}
									}
									else if (columnDB[x]['type'] == 'integer') {
										if (type=='index') {
											valueData = parseInt(_.values(value)[columnExcel[x]]);
										}
										else {
											valueData = parseInt(value[columnExcel[x]]);
										}
									}
									else {
										if (type == 'index') {
											valueData = _.values(value)[columnExcel[x]];
										}
										else {
											valueData = value[columnExcel[x]];
										}
									}
									if (Field == columnExcel[x]) {
										datane[columnDB[x]['key']] = valueData;
									}
								}
							}
							if (!_.isEmpty(datane)) {
								var isine = _.findLastIndex(tmpData, datane);
								if (isine < 0) {
									bulk.insert(datane);
									counter++;
								}
								dataToInsert.push("datane");
							}						
						}
					})

					/////////// INSERT VERSI 1.2 /////////////////
					if (counter > 0) {
						bulk.execute(function(err, result) {
							nIgnored = parseInt(dataToInsert.length) - result.nInserted;
							cb(null, {inserted : result.nInserted, ignored : nIgnored, totalRows : dataToInsert.length})
						})
					}
					else {
						cb(null, {inserted : 0, ignored : parseInt(dataToInsert.length - counter), totalRows : dataToInsert.length})
					}
				}
			});			
		})
	}
}
module.exports = ExcelHandler;