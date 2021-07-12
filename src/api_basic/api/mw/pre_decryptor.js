define([
	"module",
	"lib/cryptojs/3.1.9/crypto-js.js",
	"config.js",
	"lib/request.js"
],function(
	module,
	CryptoJS,
	config,
	r
){
	module.exports=function(parameters){
		//console.Log(module.id+":start");
		//console.Log(JSON.stringify(arguments));
		if(parameters.decrypt==true){
			//--------------------------------------------------------------------------------
			var bytes=CryptoJS.AES.decrypt(r.body,config.secret);
			var decrypted=bytes.toString(CryptoJS.enc.Utf8);
			r.body=decrypted;
			//rebuild parameters
			var body;
			try{
				body=JSON.parse(r.body);
				try{//coalesce for ease of use
					Object.keys(body).forEach(function(k){
						r.parameters[k]=body[k];
					}.bind(this));
				}catch(e){
					console.Log(e.toString());
					body=r.body;
				}
			}catch(e){
				try{
					var parser=new DomParser();
					var dom=parser.parseFromString(r.body);
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
					Object.keys(root).forEach(function(k){r.parameters[k]=root[k];}.bind(this));
				}catch(e){
				}
			}
			r.body=body;
		}
		//console.Log(module.id+":end");
	}
});

