module.exports=function(app){
	// 登录注册
	var crypto = require('crypto');
    var validator=require('validator');
    var User=require('./../models/user.js');

    app.get('/login',function(req,res){
		res.render('web/login',{title:'doujiaocms'});
	});
	app.get('/register',function(req,res){
		res.render('web/register',{title:'doujiaocms'});
	});
	app.post('/register',function(req,res){
		var errors;
		var	userName=req.body.username;
		var	password=req.body.password;
		var	rePassword=req.body.repassword;

        if(errors){
        	res.end(errors);
        }else{
        	var md5=crypto.createHash('md5');
        	var password=md5.update('password').digest('hex');
        	User.findOne({userName:userName},function(err,doc){
        		if(err){
        			errors=err;
        			res.end(errors);
        		}
        		if(doc){
        			res.sendStatus(404);
        		}else{
        			User.create({
		                userName: userName,
		                password: password,
		                email:req.body.email
		            }, function (error, doc) {
		            	console.log(doc);
		                if (error) {
		                    res.sendStatus(500);
		                } else {
		                    req.session.user=userName;
        					res.sendStatus(200);
		                }
		            });
        		}
        	})
        }
	});
};