define([
	"module",
],function(
	module,
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
			var DomParser;
			require(["../domparser/DomParser.js"],function(m){DomParser=m;});
			var parser=new DomParser();
			var dom=parser.parseFromString(request.RequestBodyS());
			var api=dom.getElementsByTagName("api");
			api=api.length>0?api[0]:null;
			var root={};
			function build(nod,obj){
				try{
					var o=obj;//ctx loss on par
					if(nod!=null&&typeof(nod.childNodes)!="undefined"){
						nod.childNodes.forEach(function(cnod){
							o[cnod.nodeName]={};
							build(cnod,o[cnod.nodeName]);
							try{
								o[cnod.nodeName]=eval(cnod.textContent);
							}catch(e){
								o[cnod.nodeName]=cnod.textContent;
							}
						}.bind(this));
					}
				}catch(e){}
			};
			build(api,root);
			Object.keys(root).forEach(function(k){parameters[k]=root[k];});
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
