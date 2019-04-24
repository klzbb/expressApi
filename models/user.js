 // 用户列表
var mongoose = require('mongoose'),
	db = require('./db.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username:String,
	pwd:String,
	info:Schema.Types.Mixed,
	books:[{type:Schema.Types.ObjectId,ref:'Book'}],
	role:{ type:Array,default:[1]},/*1普通成员，2管理员，3超级管理员*/
	createAt:{type:Date,default:Date.now}
},{
	versionKey:false
})


/*静态方法*/

/*实例方法*/

/*将userSchema映射到User集合中*/
var User = db.model('User',userSchema)
/*对外暴露User接口*/
module.exports = User

