var url=require('url');
var mongoose=require('mongoose');
var crypto=require('crypto');
var Comment = require('../comment.js');
var Q = require('q');
var bluebird = require('bluebird');

var Dbopt={

    pagination : function(obj,req,res,callback){
        //获取当前分页数，及当前的获取条数，并出入pageInfo中
        var params = url.parse(req.url,true);
        var currentPage = Number(params.query.currentPage)||1;
        var limit = Number(params.query.limit)||3;
        var startNum = (currentPage - 1)*limit;

        var pageInfo={
            "currentPage" : currentPage,
            "limit" : limit,
            "pageNum":1
        };
        
        obj.find().count().exec().then(function(num){
            console.log(num);
            pageInfo.pageNum = Math.ceil(num/limit);
            return obj.find().sort({'date':-1}).skip(startNum).limit(limit).exec();
        }).then(function(doc){
            callback(doc,pageInfo);
        }).catch(function(err){
            console.log(err);
        });      
    },
    getTags:function(obj,conditions,req,res,callback){
        //获取当前分页数，及当前的获取条数，并出入pageInfo中
        var params = url.parse(req.url,true);
        var currentPage = Number(params.query.currentPage)||1;
        var limit = Number(params.query.limit)||3;
        var startNum = (currentPage - 1)*limit;

        var pageInfo={
            "currentPage" : currentPage,
            "limit" : limit,
            "pageNum":1
        };
        
        obj.find(conditions).count().exec().then(function(num){
            pageInfo.pageNum = Math.ceil(num/limit);
            return obj.find(conditions).sort({'date':-1}).skip(startNum).limit(limit).exec();
        }).then(function(doc){
            callback(doc,pageInfo);
        }).catch(function(err){
            console.log(err);
        });      
    },
    getCount : function(obj,callback){
        obj.find({}).count().exec(function(err,doc){
            callback(err,doc);
        })
    }
}
module.exports=Dbopt;