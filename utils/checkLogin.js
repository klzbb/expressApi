
// 实现防止用户在非登陆状态下非法调用其他登陆状态下才能使用的接口
module.exports = function(req,res,next){
	if(!req.session.userInfo){
		res.json({
			code:0,
			err:'未登录'
		})
		return;
	}
	next();
}