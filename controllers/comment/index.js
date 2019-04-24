// 用户评论业务逻辑
var express = require('express'),
	Comment = require('../../models/comment.js');


var router = express.Router();

// 查
router.get('/list',function(req,res,next){
	// Comment.find(function(err,comments){
	// 	// res.render('commentList',{comments:comments})
	// 	res.json(comments)
	// })
	Comment.find({}).populate('author').exec(function(err,comments){
		res.json(comments)
	})
})
// 显示增加评论页面
router.get('/addComment',function(req,res,next){
	res.render('addComment')
})
// 增
router.post('/doAddComment',function(req,res,next){
	var data = {
		title:req.body.title,
		content:req.body.content
	}
	Comment.create(data,function(err,comments){
		res.redirect('/comment/list')
	}) 
})
// 删
router.get('/removeComment',function(req,res,next){
	Comment.findOneAndRemove({id:req.query.id },function(err,comment){
		res.redirect('/comment/list')
	})
})
// 改
router.post('/updateComment',function(req,res,next){
	var data = {
		title:req.body.title,
		content:req.body.content
	}
	Comment.findOneAndUpdate({id:req.body.id },data,function(err,comment){
		res.redirect('/comment/list')
	})
})
module.exports = router