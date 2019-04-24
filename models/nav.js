// 导航菜单栏
var mongoose = require('mongoose'),
	db = require('./db.js');


var Schema = mongoose.Schema;

/*Schema*/
var navSchema = new Schema({
	name:String,
	url:String,
});




/*静态方法*/
navSchema.statics = {
		
}

/*实例方法*/

/*将Schema映射到mongodb集合中*/

var Nav = db.model('Nav',navSchema);

/*对外暴露接口*/
module.exports = Nav