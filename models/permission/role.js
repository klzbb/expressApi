// 角色集合
var mongoose = require('mongoose'),
	db = require('./db.js');

var Schema = mongoose.Schema;

var roleSchema = new Schema({
	parent_tr_id:Number,/*父级角色ID*/
	role_name:String,
	create_time:{type:Date,default:Date.now()},
	des:String
})


/*静态方法*/

/*实例方法*/

/*schema 映射 到集合*/
var Role = db.model('Role',roleSchema)
/*对外暴露User接口*/
module.exports = Role

