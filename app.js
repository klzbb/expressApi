var express = require('express'),
	path = require('path'),
	app = express(),
	moment = require('moment'),
	opn = require('opn'),
	bodyParser = require('body-parser');

var	commentRouter = require('./controllers/comment/index.js'),
	userRouter = require('./controllers/user/index.js'),
	bookRouter = require('./controllers/book/index.js'),
	postRouter = require('./controllers/post/index.js'),
	navRouter = require('./controllers/nav/index.js'),
	bookInterfaceRouter = require('./controllers/bookInterface/index.js');

var session = require('express-session');/*实现用户认证*/
var MongoStore = require('connect-mongo')(session);/*使session持久化中间件*/

var sessionOption = {
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({url:'mongodb://localhost/api'})/*持久化，将加密ID保存在数据库里*/

}
// app.use(function(req,res,next){
// 	console.log('1')
// })
/*cors跨域设置*/
app.use(function(req, res, next) {/*放在路由前面*/
	// res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Origin", 'http://localhost:8080'||req.headers.Origin || req.headers.origin || 'http://booksys.konglingzhan.club');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}

});

app.use(session(sessionOption));


app.set('view engine','pug');
app.use(express.static('public'));

// post请求时需要对请求体进行解析req.body才能生效。
app.use(bodyParser.json())/*parsering for application/json*/
app.use(bodyParser.urlencoded({ extended:  true }))/*parsering for application/x-www-from-urlencoded*/

// 赋予模板对象，使其能在模板利用该对象做一些事情
app.use(function(req,res,next){
	app.locals.moment = moment;
	next();/*全局中间件执行完之后一定要记得调用next（），否则之后的中间件调用失败*/
})

var checkLogin = require('./utils/checkLogin.js');/*检查用户是否登陆*/

// app.use(checkLogin)
app.use('/api/comment',commentRouter)
app.use('/api/book',bookRouter)
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/book',navRouter)
app.use('/api/bookInterface',bookInterfaceRouter)



app.get('/',function(req,res,next) {
	res.render('index')
})
// 192.168.163.44
// console.log(process.env.NODE_ENV)

app.listen(3008);


// /data/home/server/mongodb-linux-x86_64-3.0.7/bin
// /data/home/server/nginx-1.7/conf/nginx.conf

// /usr/local/n/versions/node/10.4.1/bin