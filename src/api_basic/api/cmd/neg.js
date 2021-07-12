define(["module"],function(module){
	module.exports=function(options){
		options.val=0-options.val;
		return options;
	};
});
