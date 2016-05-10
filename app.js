/*引用模块*/
var express = require('express');
var favicon = require('serve-favicon')
var path = require('path');
var compression = require('compression');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-Parser');
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// 实例化app
var app = express();


// 静态压缩，模板引擎
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

//打印访问日志，及请求解析，bodyParser cookieParser
app.use(logger('dev'));
app.use(bodyParser.json({
	limit: '50mb'
}));
app.use(bodyParser.urlencoded({
	extended: false,
	limit: '50mb'
}));
app.use(cookieParser());



//设置ico 静态文件目录，
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

//设置session 需使用express-session connect-mongo模块
app.use(session({
	secret: settings.cookieSecret,
	key: settings.db, //cookie name
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	}, //30 days
	store: new MongoStore({
		url: 'mongodb://localhost/doujiaocms'
	}),
	resave: true,
	saveUninitialized: true
}));

//ueditor注册
var ueditor = require('ueditor-nodejs');
app.use('/ueditor/ue', ueditor({ //这里的/ueditor/ue是因为文件件重命名为了ueditor,如果没改名，那么应该是/ueditor版本号/ue
	configFile: '/ueditor/php/config.json', //如果下载的是jsp的，就填写/ueditor/jsp/config.json
	mode: 'local', //本地存储填写local
	accessKey: '', //本地存储不填写，bcs填写
	secrectKey: '', //本地存储不填写，bcs填写
	staticPath: path.join(__dirname, 'public'), //一般固定的写法，静态资源的目录，如果是bcs，可以不填
	dynamicPath: '/upload/blogpicture' //动态目录，以/开头，bcs填写buckect名字，开头没有/.路径可以根据req动态变化，可以是一个函数，function(req) { return '/xx'} req.query.action是请求的行为，uploadimage表示上传图片，具体查看config.json.
}));

require('./routes/index.js')(app)

//监听端口，并打印主机端口号
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('doujiaocms listening at http:%s:%s', host, port);
});