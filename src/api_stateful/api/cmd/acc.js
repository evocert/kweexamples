define(["module"],function(module){
	module.exports=function(options){
		var K=module.id;
		var val;
		if(caching.Find(K)==null)caching.Put(K,0);
		val=caching.Find(K);
		val++;
		caching.Put(K,val);
		return{"val":val};
	};
});
