// 文章列表
var mongoose = require('mongoose'),
	db = require('./db.js');


var Schema = mongoose.Schema;

/*Schema*/
var postSchema = new Schema({
	title:String,
	content:String,
	createAt:{type:Date,default:Date.now},
	author:[{type:Schema.Types.ObjectId,ref:'User'}]
});




/*静态方法*/
postSchema.statics = {
	
}

/*实例方法*/

/*将Schema映射到mongodb集合中*/

var Post = db.model('Post',postSchema);

/*对外暴露Comment接口*/
module.exports = Post