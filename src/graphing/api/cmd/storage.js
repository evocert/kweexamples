define([
	"module",
	"../lib/kwe/data.js"
],function(
	module,
	data
){
	module.exports=function(options){
		return data.test();
	};
});
