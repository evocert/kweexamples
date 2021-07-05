define(["module"],function(module){
	module.exports=function(options){
		options=typeof(options)=="object"?options:{};
		if(!options.usr)throw("EUSR");
		if(!options.pas)throw("EPAS");
		var users={
			"usr0":"pas0",
			"usr1":"pas1",
			"usr2":"pas2",
			"usr3":"pas3"
		}
		if(users[options.usr]==options.pas){
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify({
				"tok":"42",
				"usr":options.usr,
				"pas":options.pas
			}));
		}else{
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify({
				"error":"EAUTH"
			}));

		}
	};
});
