<@
require(["module","./lib/request.js"],function(module,r){
	console.Log(JSON.stringify(r,0,2));
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
		if(typeof(r.parameters.cmd)=="undefined"||r.parameters.cmd==null){
			throw("ECMD");
		}
		if(typeof(cmd[r.parameters.cmd])=="function"){
			try{

				cmd[r.parameters.cmd](options);
			}catch(e){
				request.ResponseHeader().Set("Content-Type","application/json");
				print(JSON.stringify({"error":e.toString()}));
			}
		}else{
			//--------------------------------------------------------------------------------
			//api cmds from ./cmd
			//--------------------------------------------------------------------------------
			require(["./cmd/"+r.parameters.cmd],function(cb){
				if(typeof(cb)=="function"){
					cb(options);
				}else{
					request.ResponseHeader().Set("Content-Type","application/json");
					print(JSON.stringify({"error":"EMOD"}));
				}
			},function(e){
				//request.ResponseHeader().Set("Content-Type","application/json");
				//print(JSON.stringify({"error":e.toString()}));
				//return;
			});
		}
	}catch(e){
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify({"error":e.toString()}));
	}
});
@>
