/*引用模块*/
var express=require('express');
var favicon=require('serve-favicon')
var path=require('path');
var compression=require('compression');


// 实例化app
var app=express();



// 静态压缩，模板引擎
app.use(compression());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('.html',require('ejs').renderFile);


//设置ico 静态文件目录，
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
	res.render('index');
});

//监听端口，并打印主机端口号
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('doujiaocms listening at http:%s:%s', host, port);
});