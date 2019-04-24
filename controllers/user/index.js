// 图书业务逻辑
var express = require('express'),
User = require('../../models/user.js');

var router = express.Router();

// 显示添加表单页面
router.get('/addForm',function(req,res,next){
	res.render('userAddForm')
})
// 显示登陆页面
router.get('/loginForm',function(req,res,next){
	res.render('userLogin')
})

// 登陆
router.post('/login',function(req,res,next){

	let {username,pwd} = req.body;

	if(!username){
		res.send({
			code:1,
			status:0,
			message:'用户名不能为空'
		})
		return;
	}
	if(!pwd){
		res.send({
			code:2,
			status:0,
			message:'密码不能为空'
		})
		return;
	}
	User.findOne({username}).exec(function(err,result){
		if(err){
			res.json({
				code:0,
				login:'err'
			})
			return;
		}	
		if(result){
			if(result.pwd == pwd){
				req.session.userInfo = {login:'1',user:result}
				res.send({
					code:5,
					status:3,
					login:'登陆成功',
					result:result.username,
				})
				return;
			}else{
				res.send({
					code:4,
					status:2,
					login:'密码错误'
				})
				return;
			}
		}else{
			res.send({
				code:3,
				status:1,
				login:'用户名错误'
			})
			return;
		}
	})
})
// 登出
router.post('/logout',function(req,res,next){
	req.session.userInfo = null;
	req.session.destroy(function(err){
		res.json({
			code:1,
			status:1,
			logout:'登出成功'
		})
	})
})

// 增(注册)
router.post('/add',function(req,res,next){

	let {username,pwd,role,books,info} = req.body;
	let role_arr = [];
	let data;

	if(!username){
		res.send({
			status:0,
			code:2,
			message:'请输入用户名'
		})
		return;
	}else if(!pwd){
		res.send({
			status:0,
			code:3,
			message:'请输入密码'
		})
		return;
	}

	if(role){/*权限*/
		role = role.split(',');
		role.map(function(item_arr){
			role_arr.push(+item_arr)
		});
		data = {
			username:username,
			pwd:pwd,
			role:role_arr,
			books:books,
			info:info
		};
	}else{
		data = {
			username:username,
			pwd:pwd,
			books:books,
			info:info
		};
	}
	
	User.findOne({username},function(err,result){
		if(result){
			res.send({
				status:0,
				code:4,
				message:'该用户已存在'
			})	
		}else{
			User.create(data,function(err,result){
				res.send({
					status:1,
					code:1,
					success:'创建用户成功',
					result:result
				})
				return;
			})
		}
	})

})


// 删
router.post('/del/:id',function(req,res,next){
	const user_id = req.params.id;
	User.remove({_id:user_id},function(err,result){
		if(err){
			res.json({
				code:0,
				err:'del fail'
			})
			return;
		}else{
			res.json({
				code:1,
				del:'done',
				delBy:'del by _id'
			})
			return;
		}
	})
})

// 返回用户相关的书籍
router.post('/getuserbook/:username',function(req,res,next){
	var limit = 15;
	var skip;
	var page;
	let count;
	const username = req.params.username;
	const status = req.body.status;
	if(!username){
		res.send({
			status:0,
			message:'params error'
		})
		return;
	}else if(!status){
		res.send({
			status:0,
			message:'need status 参数'


		})
	}else{
		User.findOne({username}).populate('books').exec(function(err,result){
			let realresult = [];
			if(status == 3){
				result.books.map(function(item){
					if(item.status == 3){
						realresult.push(item)
					}
				})
				res.send({
					status:1,
					code:1,
					result:realresult,
					message:'预约书籍'
				})
				return;
			}else if(status == 4){
				result.books.map(function(item){
					if(item.status == 4){
						realresult.push(item)
					}
				})
				res.send({
					status:1,
					code:2,
					result:realresult,
					message:'已借阅的书籍'
				})
				return;
			}else if(status == 5){
				res.send({
					result:result.books,
					status:1,
					code:3,
					message:'用户所有相关书籍'
				})
			}
			
			return;
		})
	}	
})


// 显示编辑表单页面
router.get('/editForm/:id',function(req,res,next){
	Book.find({_id:req.params['id']}).exec(function(err,book){
		var book = book[0];
		res.render('editBookForm',{book:book})
		return;
	})
})


// 改
router.post('/update/:id',function(req,res,next){
	
	let {username,pwd,role,info} = req.body;
	const user_id = req.params.id;
	if(!user_id){
		res.send({
			status:0,
			message:'params 参数错误'
		})
		return;
	}else if(!username){
		res.send({
			status:0,
			message:'修改后的用户名不能为空'
		})
		return;
	}else if(!pwd){
		res.send({
			status:0,
			message:'修改后的密码不能为空'
		})
		return;
	}else if(!role){
		res.send({
			status:0,
			message:'修改后的权限不能为空'
		})
		return;
	}

	let data;

	if(role){
		role = role.spilt(',').map(function(item){
			return +item;
		})	
		data = {
			username:username,
			pwd:pwd,
			role:role,
			info:info,
		}
	}

	User.findOneAndUpdate({_id:user_id},{$set:data},function(err,result){
		res.send({
			status:1,
			success:'数据修改成功'
		})
	})


})


// 为用户添加书籍
router.post('/addbookid/:username',function(req,res,next){
	const username = req.params.username
	const book_id = req.body.book_id
	if(!username){
		res.send({
			status:0,
			message:'params error'
		})
		return;
	}else if(!book_id){
		res.send({
			status:0,
			message:'need book_id'
		})
		return;
	}else{
		User.findOneAndUpdate({username:username},{$push:{books:book_id}},function(err,result){
			res.send({
				status:1,
				success:'book_id添加成功'
			})
		})
	}

})

// 查（按页查找，每页返回15条数据）
router.get('/find',function(req,res,next){
	var limit = 15;
	var skip;
	var page;
	const username = req.query.username;
	if(!req.query.status){
		res.send({
			status:0,
			message:'need query.status'
		})
		return;
	}else{
		switch(req.query.status){
			case '1' :/*普通用户*/
				User.where('role').equals({$in:[1]}).sort({_id:-1}).skip().limit().exec(function(err,result){
					res.json({
						code:1,
						find:'done',
						findBy:'status 1',
						result:result
					})
					return;
				})
				break;
			case '2' :/*管理员*/
				User.where('role').equals({$in:[2]}).sort({_id:-1}).skip().limit().exec(function(err,result){
					res.json({
						code:1,
						find:'done',
						findBy:'status 1',
						result:result
					})
					return;
				})
				break;
			case '3' :/*超级管理员*/
				User.where('role').equals({$in:[3]}).sort({_id:-1}).skip().limit().exec(function(err,result){
					res.json({
						code:1,
						find:'done',
						findBy:'status 1',
						result:result
					})
					return;
				})
				break;
			case '4' :/*filter by username*/
				User.find({username:username}).sort({_id:-1}).skip().limit().exec(function(err,result){
					res.json({
						code:1,
						find:'done',
						findBy:'status 1',
						result:result
					})
					return;
				})
				break;
			case '5' :/*filter by username*/
				User.find().sort({_id:-1}).skip().limit().exec(function(err,result){
					res.json({
						code:1,
						find:'done',
						findBy:'status 1',
						result:result
					})
					return;
				})
				break;
			default:
		}
	}
})

module.exports = router