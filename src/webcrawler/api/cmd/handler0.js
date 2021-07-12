define(["module"],function(module){
	var K="log";
	module.exports=function(url,body){
		caching.Push(K,[{'ts':url,"msg":body}]);
		caching.Reset();
	};
});
