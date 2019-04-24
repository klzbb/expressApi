// 用户集合
var mongoose = require('mongoose'),
	db = require('./db.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	to_id:Number,
	login_name:String,
	pwd:Number,
	user_name:String,
	mobile:Number,
	email:Number,
	create_time:{type:Date,default:Date.now()},
	login_time:Date,
	last_login_time:Date,
	count:Number
})


/*静态方法*/

/*实例方法*/

/*将userSchema映射到User集合中*/
var User = db.model('User',userSchema)
/*对外暴露User接口*/
module.exports = User

