define(["module"],function(module){
	module.exports=function(options){
		//request.ResponseHeader().Set("Content-Type","application/json");
		//print(JSON.stringify({"val":options.a*options.b}));
		return {val:options.a*options.b};
	};
});
