
var mongoose=require('mongoose');
var Promise=require('bluebird');
//var settings=require('./settings');
//var db=mongoose.connect(settings.URL);

var CommentSchema = new mongoose.Schema({
	cmtTitle: {type: String},
	cmtContent: {type: String},
	cmtTag: {type: Array},
	date: {type: String},
	cmtAnswer:[{}],
	brief:{type: String}
});
var Comment = mongoose.model('Comment', CommentSchema);


Promise.promisifyAll(Comment);
Promise.promisifyAll(Comment.prototype);

module.exports=Comment;
