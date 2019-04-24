var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost/api');

db.once('open',function(callback){
	console.log('created mongodb')
});

module.exports = db;