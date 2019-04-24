// 文章业务逻辑
var express = require('express'),
	Post = require('../../models/post.js');
var router = express.Router();


// 显示添加表单页面
router.get('/addForm',function(req,res,next){
	res.render('postAddForm')
})


// 增
router.post('/add',function(req,res,next){
	console.log(req.body)
	var data = {
		title:req.body.title,
		content:req.body.content,
	}
	Post.create(data,function(err,post){
		res.redirect('/post/find')
	}) 
})


// 删
router.get('/del/:id',function(req,res,next){
	console.log(req.params['id'])
	Post.remove({"_id":req.params['id']},function(err,post){
		if(err){
			console.log('del no')
		}
		if(post){
			res.redirect('/post/find')
		}
	})
})

// 查（按页查找，每页返回15条数据）
router.get('/find',function(req,res,next){
	// Post.find(function(err,posts){
	// 	res.render('bookList',{posts:posts})
	// })
	// var skip = req.query.page
	Post.find({}).sort({_id:-1}).exec(function(err,posts){
		res.render('postList',{
			posts:posts
		})
	})
})


// 显示编辑表单页面
router.get('/editForm/:id',function(req,res,next){
	Post.find({_id:req.params['id']}).exec(function(err,post){
		var post = post[0];
		res.render('postEditForm',{post:post})
	})
})


// 改
router.post('/update/:id',function(req,res,next){
	var data = {
		title:req.body.title,
		content:req.body.content,
		author:req.body.author,
	}
	Post.findOneAndUpdate({_id:req.params['id'] },data,function(err,post){
		res.redirect('/post/find') 
	})
})



module.exports = router