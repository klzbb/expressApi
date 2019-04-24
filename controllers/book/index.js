// 图书业务逻辑
var express = require('express'),
Book = require('../../models/book.js'),
User = require('../../models/user.js');
var router = express.Router();
// 显示添加表单页面
router.get('/addForm',function(req,res,next){
	res.render('addBookForm')
})
// 增
router.post('/add',function(req,res,next){
	var data = {
		name:req.body.name,
		buyAt:req.body.buyAt,
		category:req.body.category,
		author:req.body.author,
		status:req.body.status
	}
	Book.create(data,function(err,book){
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
	let limit = 15;
	let page = parseInt(req.query.page)-1;
	let skip = limit*page;
	let count;
	if(!req.query.status){
		res.send({
			status:0,
			message:'need query.status'
		})
		return;
	}else{
		switch(req.query.status){
			case '1' :/*1*/
			Book.count({status:1},function(err,result){
				count = result
			})
			Book.find({status:1}).sort({_id:-1}).skip(skip).limit(limit).exec(function(err,books){
				res.json({
					code:1,
					find:'done',
					findBy:'status 1',
					books:books,
					count:count
				})
				return;
			})
			break;
			case '2' :/*2*/
			Book.count({status:2},function(err,result){
				count = result
			})
			Book.find({status:2}).sort({_id:-1}).skip(skip).limit(limit).exec(function(err,books){
				res.json({
					code:1,
					find:'done',
					findBy:'status 2',
					books:books,
					count:count,
				})
				return;
			})
			break;
			case '3' :/*3*/
			Book.count({status:3},function(err,result){
				count = result
			})
			Book.find({status:3}).sort({_id:-1}).skip(skip).limit(limit).exec(function(err,books){
				res.json({
					code:1,
					find:'done',
					findBy:'status 3',
					books:books,
					count:count,
				})
				return;
			})
			break;
			case '4' :/*4*/
			Book.count({status:4},function(err,result){
				count = result
			})
			Book.find({status:4}).sort({_id:-1}).skip(skip).limit(limit).exec(function(err,books){
				res.json({
					code:1,
					find:'done',
					findBy:'status 4',
					books:books,
					count:count,
				})
				return;
			})
			break;
			case '5' :/*4+3*/
			Book.where('status').in(['3', '4']).count(function(err,result){
				count = result
			})
			Book.where('status').in(['3', '4']).sort({_id:-1}).skip(skip).limit(limit).exec(function(err,books){
				res.json({
					code:1,
					find:'done',
					findBy:'all {}',
					books:books,
					count:count,
				})
				return;
			})
			break;
			case '6' :/*2 && filter by name*/
			Book.where('status').equals(2).where('name').equals(req.query.name).count(function(err,result){
				count = result
			})
			Book.where('status').equals(2).where('name').equals(req.query.name).sort({_id:-1}).skip(skip).limit(limit).exec(function(err,books){
				res.json({
					code:1,
					find:'done',
					findBy:'name',
					books:books,
					count:count,
				})
				return;
			})
			break;
			case '7' :/*2+3+4 && filter by name*/
			Book.where('status').gte(2).where('name').equals(req.query.name).count(function(err,result){
				count = result
			})
			Book.where('status').gte(2).where('name').equals(req.query.name).sort({_id:-1}).skip(skip).limit(limit).exec(function(err,books){
				res.json({
					code:1,
					find:'done',
					findBy:'name',
					books:books,
					count:count,
				})
				return;
			})
			break;
			case '8' :/*2+3+4*/
			Book.where('status').gte(2).count(function(err,result){
				count = result
			})
			Book.where('status').gte(2).sort({_id:-1}).skip(skip).limit(limit).exec(function(err,books){
				res.json({
					code:1,
					find:'done',
					findBy:'name',
					books:books,
					count:count,
				})
				return;
			})
			break;
			case '9' :/*1+2+3+4*/
			Book.where('status').gte(1).count(function(err,result){
				count = result
			})
			Book.where('status').gte(1).sort({_id:-1}).skip(skip).limit(limit).exec(function(err,books){
				res.json({
					code:1,
					find:'done',
					findBy:'name',
					books:books,
					count:count,
				})
				return;
			})
			break;
			default:
		}
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
	
	if(!req.body.name){
		res.send({
			code:2,
			status:0,
			message:'书籍名称不能为空'
		})
		return;
	}else if(!req.body.status){
		res.send({
			code:3,
			status:1,
			message:'状态不能为空'
		})
		return;
	}
	// 当改动数据的时候需要对传入的数据进行校验，字段条数，字段数据类型
	let data = {
		name:req.body.name,
		author:req.body.author,
		category:req.body.category,
		borrower:req.body.borrower,
		status:req.body.status,
	}
	const book_id = req.params.id;
	// 当有未定义字段进来的时候，修改失败(如_id和_v字段)
	Book.findOneAndUpdate({_id:book_id},{$set:data}).exec(function(err,result){
		if(err){
			res.send({
				code:0,
				update:'update fail',
			})
			return;
		}else{
			res.send({
				code:1,
				update:'done',
			})
			return;
		}
	})

	
	
})
module.exports = router
