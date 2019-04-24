// 图书系统入口导航
var mongoose = require('mongoose'),
	db = require('./db.js');


var Schema = mongoose.Schema;

/*Schema*/
var bookInterfaceSchema = new Schema({
	name:String,/*名称*/
	url:String,
	status:Number,/*1前台用户页面状态，2后台管理员页面状态*/
});



/*将Schema映射到mongodb集合中*/

var BookInterface = db.model('BookInterface',bookInterfaceSchema);

/*对外暴露接口*/
module.exports = BookInterface