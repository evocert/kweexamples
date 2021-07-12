define(["module"],function(module){
	module.exports=function(options){
		options.val=options.val<0?(0-options.val):options.val;
		return options;
	};
});
