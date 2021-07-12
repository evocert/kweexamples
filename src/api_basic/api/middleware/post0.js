define(["module"],function(module){
	module.exports=function(parameters,ret){
		console.Log(module.id+":start");
		console.Log(JSON.stringify(arguments));
		if(parameters.cmd=="sub")
			ret.val="modified by "+module.id;
		console.Log(module.id+":end");
	}
});
