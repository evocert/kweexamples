define(["module"],function(module){
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
			}catch(e){}
		}catch(e){
			body=request.RequestBody();
		}
	}
	module.exports={
		method:method,
		parameters:parameters,
		headers:headers,
		body:body
	}
});
