/*角色表*/
var mongoose = require('mongoose'),
	db = require('./db.js');

var Schema = mongoose.Schema;

var roleSchema = new Schema({
	name:String,
	status:Number,/*1普通用户，2管理员，3，超级管理员*/
	right:[{type:Schema.Types.ObjectId,ref:'Right'}]
})


/*静态方法*/

/*实例方法*/

/*将userSchema映射到User集合中*/
var Role = db.model('Role',roleSchema)
/*对外暴露User接口*/
module.exports = Role

