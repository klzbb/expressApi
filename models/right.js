/*权限表*/
var mongoose = require('mongoose'),
	db = require('./db.js');

var Schema = mongoose.Schema;

var rightSchema = new Schema({
	name:String,
	status:Number,/*1普通用户，2管理员，3，超级管理员*/
})

// 用户表(user_id)  角色表(role_id)   权限表(right_id)
// role => [role_id] right => [right_id]

/*静态方法*/

/*实例方法*/

/*将userSchema映射到User集合中*/
var Right = db.model('Right',rightSchema)
/*对外暴露User接口*/
module.exports = Role

