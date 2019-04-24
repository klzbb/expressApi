// 图书业务逻辑
var express = require('express'),
	BookInterface = require('../../models/bookInterface.js');
var router = express.Router();


// 显示添加表单页面
router.get('/addForm',function(req,res,next){
	res.render('bookInterfaceForm')
})


// 增
router.post('/add',function(req,res,next){
	var data = req.body;
	BookInterface.create(data,function(err,result){
		res.json({
			code:1,
			add:'done'
		})
		return;
	}) 
})


// 删
router.post('/del/:id',function(req,res,next){
	Book.remove({"_id":req.params['id']},function(err,book){
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

// 查（按页查找，每页返回15条数据）
router.get('/find',function(req,res,next){
	var limit = 15;
	var skip;
	var page;

	if(req.query.status && req.query.status != 'undefined'){
		switch(req.query.status){
			case '1' :/*申请订购*/
				Book.find({status:1}).sort({_id:-1}).skip().limit().exec(function(err,books){
					res.json({
						code:1,
						find:'done',
						findBy:'status 1',
						books:books
					})
					return;
				})
				break;
			case '2' :/*确认订购*/
				Book.find({status:2}).sort({_id:-1}).skip().limit().exec(function(err,books){
					res.json({
						code:1,
						find:'done',
						findBy:'status 2',
						books:books
					})
					return;
				})
				break;
			case '3' :/*申请预定*/
				Book.find({status:3}).sort({_id:-1}).skip().limit().exec(function(err,books){
					res.json({
						code:1,
						find:'done',
						findBy:'status 3',
						books:books
					})
					return;
				})
				break;
			case '4' :/*确认预定*/
				Book.find({status:4}).sort({_id:-1}).skip().limit().exec(function(err,books){
					res.json({
						code:1,
						find:'done',
						findBy:'status 4',
						books:books
					})
					return;
				})
				break;
			default:
		}
	}else if(req.query.name && req.query.name != 'undefined'){/*find by name*/
		Book.find({name:req.query.name,status:2}).sort({_id:-1}).skip().limit().exec(function(err,books){
			res.json({
				code:1,
				find:'done',
				findBy:'name',
				books:books
			})
			return;
		})
	}else{/*find all*/
		Book.where('status').gte(2).sort({_id:-1}).skip().limit().exec(function(err,books){
			res.json({
				code:1,
				find:'done',
				findBy:'all {}',
				books:books
			})
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
	var data = req.body;

	/*将书籍ID插入目前登陆用户的文档里*/
	// User.findOneAndUpdate(userId,{$push:{books:req.params['id']}})

	Book.findOneAndUpdate({_id:req.params['id']},data,function(err,book){
		if(err){
			res.json({
				code:0,
				update:'update fail'
			})
			return;
		}else{
			res.json({
				code:1,
				update:'done'
			})
			return;
		}
	})

})


module.exports = router
