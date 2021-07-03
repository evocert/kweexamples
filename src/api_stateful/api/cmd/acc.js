define(["module"],function(module){
	module.exports=function(options){
		request.ResponseHeader().Set("Content-Type","application/json");
		var K=module.id;
		var val;
		if(caching.Find(K)==null)caching.Put(K,0);
		val=caching.Find(K);
		print(JSON.stringify({"val":val}));
		val++;
		caching.Put(K,val);
	};
});
