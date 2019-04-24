// 评论列表
var mongoose = require('mongoose'),
	db = require('./db.js');


var Schema = mongoose.Schema;

/*Schema*/
var commentSchema = new Schema({
	title:String,
	createAt:{type:Date,default:Date.now},
	content:String,
	author:[{type:Schema.Types.ObjectId,ref:'User'}]
});




/*静态方法*/
commentSchema.statics = {
	
}

/*实例方法*/

/*将Schema映射到mongodb集合中*/

var Comment = db.model('Comment',commentSchema);

/*对外暴露Comment接口*/
module.exports = Comment