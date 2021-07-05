define(["module","../lib/auth.js"],function(module,auth){
	module.exports=function(options){
		options=typeof(options)=="object"?options:{};
		if(!options.tok)throw("ETOK");
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify({"status":"OK"}));
	};
});
