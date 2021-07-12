define(["module"],function(module){
	module.exports=function(){
		console.Log(module.id+":start");
		console.Log(JSON.stringify(arguments));
		console.Log(module.id+":end");
	}
});
