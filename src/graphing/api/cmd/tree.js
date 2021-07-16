define([
	"module",
	"../lib/kwe/tree.js"
],function(
	module,
	Tree
){
	module.exports=function(options){
		var t=new Tree.Tree();
		return t.test();
	};
});
