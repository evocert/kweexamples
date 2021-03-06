<@
require([
	"module",
	"./lib/request.js",
],function(
	module,
	r
){
	var t0=new Date();
	console.Log("A>>>>");
	console.Log(JSON.stringify(r));
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
				//request.ResponseHeader().Set("Content-Type","application/json");
				//print(JSON.stringify({"error":e.toString()}));
				//return;
			});
		}
		if(ret!=null){
			switch(typeof(ret)){
				case"string":
					request.ResponseHeader().Set("Content-Type","text/plain");
					print(ret);
					break;
				case"number":
				case"object":
					request.ResponseHeader().Set("Content-Type","application/json");
					print(JSON.stringify(ret,0,2));
					break;
			}
		}

	}catch(e){
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify({"error":e.toString()}));
	}
	var t1=new Date();
	console.Log("Total duration: "+(t1-t0)+" ms");
});
@>
