define([
	"module",
        "./domparser/DomParser.js"
],function(
	module,
        DomParser
){
	var parameters={}
	request.Parameters().StandardKeys().forEach(function(k){
		try{
			parameters[k.toLowerCase()]=eval(request.Parameters().StringParameter(k));
		}catch(e){
			parameters[k.toLowerCase()]=request.Parameters().StringParameter(k);
		}
	});
	var headers={};
	request.RequestHeaders().forEach(function(k){
		headers[k]=request.RequestHeader().Get(k)
	});
	var method=request.ProtoMethod();
	var body;
	if(headers["Content-Type"]&&headers["Content-Type"].startsWith("application/json")){
		try{
			body=JSON.parse(request.RequestBodyS());
			try{//coalesce for ease of use
				Object.keys(body).forEach(function(k){
					parameters[k]=body[k];
				});
			}catch(e){
				console.Log(e.toString());
				body=request.RequestBodyS();
			}
		}catch(e){
			body=request.RequestBodyS();
		}
	}else if(headers["Content-Type"]&&headers["Content-Type"].startsWith("application/xml")){
		try{
			var parser=new DomParser();
			var dom=parser.parseFromString(request.RequestBodyS());
			var api=dom.getElementsByTagName("api");
			api=api.length>0?api[0]:null;
			if(api!=null){
				api.childNodes.forEach(function(childNode){
					try{
						parameters[childNode.nodeName]=eval(childNode.textContent);
					}catch(e){
						parameters[childNode.nodeName]=childNode.textContent;
					}
				});
			}else{
			}
		}catch(e){
			body=request.RequestBodyS();
		}
	}else{
		body=request.RequestBodyS();
	}
	module.exports={
		method:method,
		parameters:parameters,
		headers:headers,
		body:body
	}
});