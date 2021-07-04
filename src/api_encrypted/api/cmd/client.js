define(["module"],function(module){
	module.exports=function(options){
		//request.ResponseHeader().Set("Content-Type","application/javascript");
		request.ResponseHeader().Set("Content-Type","application/x-kwecrypted");
		print('(function(){alert("TEST");})()');
	};
});

