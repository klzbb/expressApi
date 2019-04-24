// 菜单栏业务逻辑
var express = require('express'),
	Nav = require('../../models/nav.js');
var router = express.Router();


router.get('/navs',function(req,res,next){
	Nav.find().exec(function(err,navs){
		res.json({
			navs:navs
		})
	})
})

module.exports = router