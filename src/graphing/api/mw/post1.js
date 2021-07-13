define(["module"],function(module){
	module.exports=function(parameters,ret){
		//console.Log(module.id+":start");
		//console.Log(JSON.stringify(arguments));
		//console.Log(module.id+":end");
		if(parameters.cmd=="add"){
			ret.val={val:"modified by "+module.id};
		}
		return true;
	}
});
