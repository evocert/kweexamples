<@
/* todo: pre and post processors */

require([
	"module",
	"./lib/request.js",
	"./lib/xml2json.js",
],function(
	module,
	r,
	xml2json
){
	var t0=new Date();
	//--------------------------------------------------------------------------------
	//internal api cmds here
	//--------------------------------------------------------------------------------
	var cmd={}
	//--------------------------------------------------------------------------------
	var options={};
	Object.keys(r.parameters).filter(function(k,v){
		return k!="cmd";
	}).forEach(function(k){
		options[k]=r.parameters[k];
	});
	try{
		var ret=null;
		if(typeof(r.parameters.cmd)=="undefined"||r.parameters.cmd==null){
			throw("ECMD");
		}
		if(typeof(cmd[r.parameters.cmd])=="function"){
			try{
				ret=cmd[r.parameters.cmd](options);
			}catch(e){
				ret={"error":e.toString()};
			}
		}else{
			//--------------------------------------------------------------------------------
			//api cmds from ./cmd
			//--------------------------------------------------------------------------------
			require(["./cmd/"+r.parameters.cmd],function(cb){
				if(typeof(cb)=="function"){
					ret=cb(options);
				}else{
					ret={"error":"EMOD"};
				}
			},function(e){
				ret={"error":e.toString()};
			});
		}
		if(ret!=null){
			switch(typeof(ret)){
				case"number":
				case"string":
					request.ResponseHeader().Set("Content-Type","text/plain");
					print(ret);
					break;
				case"object":
					var outfmt=r.parameters["outfmt"];
					if(outfmt=="xml"){
						request.ResponseHeader().Set("Content-Type","application/xml");
						print(xml2json(ret));
					}else{
						request.ResponseHeader().Set("Content-Type","application/json");
						print(JSON.stringify(ret,0,2));
					}
					break;
			}
		}

	}catch(e){
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify({"error":e.toString()}));
	}
	var t1=new Date();
});
@>
