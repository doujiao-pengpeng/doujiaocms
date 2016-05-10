var Q = require('q');
var fs = require('fs');
var path = require('path');

/*********************************************************************************************
首先引入Q库
Q.Promise 能将异步逻辑包装成一个thenable函数，从而注入它实现的回调函数,
Q.defer也可以手动创建promise


*********************************************************************************************/
/*
function readFile(previous,fileName){
	return Q.Promise(function(resolve,reject){
		fs.readFile(path.join(process.cwd(),fileName),function(err,text){
			if(err){
				reject(new Error(err));
			}else{
				resolve(previous+ text.toString());
			}
		});
	});
}

readFile('','1.txt').then(function(previous){
	return readFile(previous,'2.txt');
}).then(function(finalText){
	console.log(finalText);
}).catch(function(error){
	console.log(error);
}).done();
*/

//同时支持callbacks和promise的APIs
// function readFile(previous,file,encoding,callback){
// 	var defered = Q.defer();
// 	fs.readFile(file,encoding,function(err,data){
// 		if(err){
// 			defered.reject(err); //拒绝该承诺将err作为参数
// 		} else {
// 			defered.resolve(previous+data);//实现该承诺将data作为参数
// 		}
// 	});
// 	return defered.promise.nodeify(callback);//当promise被实现或者拒绝后，会调用该函数
// }

// readFile('','1.txt','utf-8').then(function(previous){
// 	return readFile(previous,'2.txt','utf-8');
// }).then(function(finalText){
// 	console.log(finalText);
// });
var bb=require('bluebird');
var Comment = require('../../models/comment.js');
//var Comment.findAsync=bb.promisify(Comment.find());
// console.log(CommentfindAsync().then(function(num){
// 	console.log(num);
// 	// Comment.find().sort({'date':-1}).skip(3).limit(3).execAsync();
// }).catch(function(err) {
//    console.log(err);
// }));
Comment.find({}).count().exec(function(err,doc){
	if(err){
		console.log(err);
	}
	console.log(doc);
});