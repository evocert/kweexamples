define(["module"],function(module){
	module.exports=function(options){
		//request.ResponseHeader().Set("Content-Type","application/json");
		//print(JSON.stringify({"val":"help stub"}));
		return{"commands":[
			"add",
			"sub",
			"mul",
			"div",
			"help"
		],"version":{
			"major":0,
			"minor":1,
			"patch":2
		}};
	};
});
