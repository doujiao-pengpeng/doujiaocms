var url=require('url');
var Dbopt = require('../models/common/Dbopt');
module.exports = function(app) {
	var Comment = require('../models/comment.js');
	var moment=require('moment');
	var querystring = require('querystring');
	app.get('/admin', function(req, res) {
		res.render('manage/index');
	});
	app.get('/', function(req, res) {
		Dbopt.pagination(Comment,req,res,function(doc,pageInfo){
			dataInfo={
				Comment:doc,
				Page:pageInfo
			};
			res.render('web/commentlist',dataInfo);
		})
	});

	app.get('/commentlist', function(req, res) {
		Dbopt.pagination(Comment,req,res,function(doc,pageInfo){
			dataInfo={
				Comment:doc,
				Page:pageInfo
			};
			res.render('web/commentlist',dataInfo);
		})
	});
	app.get('/addcomment', function(req, res) {
		res.render('web/addcomment', {
			title: '就业指导网'
		});
	});
	app.post('/addcomment', function(req, res) {
		var cmtTag=req.body.cmtTag;
		cmtTag=cmtTag.split(",");
		console.log(cmtTag);
		cmtTag.pop();
		Comment.findOne({cmtTitle:req.body.cmtTitle},function(error,doc){
			if(doc){//问题存在
				res.sendStatus(404);
			}else{
				Comment.create({
					cmtTitle:req.body.cmtTitle,
					cmtContent:req.body.cmtContent,
					cmtTag : cmtTag,
					date: moment().format('YYYY-MM-DD HH:mm:ss'),
					brief:req.body.brief
				},function(error,doc){
					if(error){
						res.sendStatus(404);
					}else{
						console.log(doc);
						res.sendStatus(200);
					}
				})
			}
		})
	});
	app.get('/q_detail', function(req, res) { //问题详情页
		res.render('web/q_detail', {
			title: 'doujiaocms',
			user: 'dd',
		});
	});
	app.get('/:url',function(req,res){
		var url = req.params.url;
		var currentId = url.split('.')[0];
		Comment.findOne({'_id':currentId},function(err,doc){
			if(err){
				res.end(err);
			}else{
				res.render('web/q_detail', {
					title: 'doujiaocms',
					user: 'dd',
					Comment:doc
				});
			}
		})
	})
	app.post('/:url/answer',function(req,res){
		Comment.findById(req.body._id,function(err,doc){
			var _id = doc._id; //需要取出主键_id
      		delete doc._id;   		
			var date=moment().format('YYYY-MM-DD HH:mm:ss');
			var data={answer:req.body.cmtAnswer,date:date};
			doc.cmtAnswer.push(data);
			Comment.update({_id:_id},doc,function(err,doc){
				if(err){
					res.end(err);
				}else{
					res.sendStatus(200);
				}
			});
		})
	})
	app.get('/tags/:tag',function(req,res){
		var url = req.params.tag;
		var Tag = url.split('.')[0];
		//console.log(Tag);
		Dbopt.getTags(Comment,{"cmtTag":Tag},req,res,function(doc,pageInfo){
			dataInfo={
				Comment:doc,
				Page:pageInfo
			};
			res.render('web/tags',dataInfo);
		});
	})
	require('./user')(app);
};