// 图书列表
var mongoose = require('mongoose'),
	db = require('./db.js');


var Schema = mongoose.Schema;

/*Schema*/
var bookSchema = new Schema({
	name:String,/*名称*/
	author:String,/*作者*/
	borrower:{type:String,ref:'User'},
	category:{type:String,default:'IT'},/*种类*/
	buyAt:{type:Date,default:Date.now},/*入库时间*/
	status:{type:Number,default:1}/*1申请订购；2订购完成；3预约书籍；4预约完成*/
},{
	versionKey:false
});




/*静态方法*/
bookSchema.statics = {
	
}

/*实例方法*/

/*将Schema映射到mongodb集合中*/

var Book = db.model('Book',bookSchema);

/*对外暴露接口*/
module.exports = Book