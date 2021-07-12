define(["module"],function(module){
	module.exports=function(parameters){
		console.Log(module.id+":start");
		console.Log(JSON.stringify(arguments));
		if(parameters.cmd=="mul"){
			throw("blocked by "+module.id);
		}
		console.Log(module.id+":end");
	}
});
