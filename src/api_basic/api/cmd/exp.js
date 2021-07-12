define(["module"],function(module){
	module.exports=function(options){
		options.val=options.val*options.val;
		return options;
	};
});
