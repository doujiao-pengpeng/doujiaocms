var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	models = require('./models.js');

mongoose.connect("mongodb://127.0.0.1:27017/doujiao");

for(var m in  models){
	//先根据传入的值，创建Schema骨架，其中models[m]为schema的参数，
	//再根据对应的集合名和Schema创建Model模型操纵数据库对应集合
	//但是应该把创建后的传给一个对象啊？
	mongoose.model(m,new Schema(models[m]));

}

module.exports = {
	getModel : function(type){
		return _getModel(type);
	}
};

var _getModel=function(type){
	return mongoose.model(type);
}
