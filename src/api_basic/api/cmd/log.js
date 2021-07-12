define(["module"],function(module){
	module.exports=function(){
		console.Log(JSON.stringify(arguments));
		return arguments;
	};
});
