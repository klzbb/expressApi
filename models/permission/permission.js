// 权限集合
var mongoose = require('mongoose'),
	db = require('./db.js');

var Schema = mongoose.Schema;

var permissionSchema = new Schema({
	parent_perssion_id:Number,/*父权限ID*/
	permission_name:String,
	des:String
})


/*静态方法*/

/*实例方法*/

/*schema 映射到集合*/
var Permission = db.model('Permission',permissionSchema)
/*对外暴露接口*/
module.exports = Permission

