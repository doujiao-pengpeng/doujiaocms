var mongoose=require('mongoose');
var settings=require('./settings');
var db=mongoose.connect(settings.URL);

var shortid= require('shortid');

var UserSchema = new mongoose.Schema({
	_id:{
		type:String,
		unique:true,
		'default':shortid.generate
	},
	name:String,
	userName:String,
	password:String,
	email:String,
	qq:String,
	phoneNum:Number,
	comments:{type:String,default:"这个人很懒，什么也没留下"},
	date: { type: Date, default: Date.now },
	logo: { type: String, default: "/upload/images/defaultlogo.png" },
	openid : String,   // 针对qq互联
	retrieve_time : {type: Number} // 用户发送激活请求的时间
});

var User=db.model('User',UserSchema,'users');//第三个参数为在数据库中的集合名

module.exports=User;
