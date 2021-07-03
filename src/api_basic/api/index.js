<@
	//--------------------------------------------------------------------------------
	//internal api cmds here
	//--------------------------------------------------------------------------------
	var cmd={
		help:function(options){
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify({"commands":Object.keys(this)}));
		},
		add:function(options){
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify({"val":options.a+options.b}));
		},
		sub:function(options){
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify({"val":options.a-options.b}));
		}
	}
	//--------------------------------------------------------------------------------
	var parameters={}
	request.Parameters().StandardKeys().forEach(function(k){
		try{
			parameters[k.toLowerCase()]=eval(request.Parameters().StringParameter(k));
		}catch(e){
			parameters[k.toLowerCase()]=request.Parameters().StringParameter(k);
		}
	});
	var options={};
	Object.keys(parameters).filter(function(k,v){
		return k!="cmd";
	}).forEach(function(k){
		options[k]=parameters[k];
	});
	try{
		if(typeof(parameters.cmd)=="undefined"||paramters.cmd==null){
			throw("ECMD");
		}
		if(typeof(cmd[parameters.cmd])=="function"){
			try{

				cmd[parameters.cmd](options);
			}catch(e){
				request.ResponseHeader().Set("Content-Type","application/json");
				print(JSON.stringify({"error":e.toString()}));
			}
		}else{
				//--------------------------------------------------------------------------------
				//api cmds from ./cmd
				//--------------------------------------------------------------------------------
				require(["./cmd/"+parameters.cmd],function(cb){
					if(typeof(cb)=="function"){
						cb(options);
					}else{
						request.ResponseHeader().Set("Content-Type","application/json");
						print(JSON.stringify({"error":"EMOD"}));
					}
				},function(e){
					request.ResponseHeader().Set("Content-Type","application/json");
					print(JSON.stringify({"error":e.toString()}));
				});
		}
	}catch(e){
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify({"error":e.toString()}));
	}
@>
