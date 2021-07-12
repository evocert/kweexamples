<@
require([
	"module",
	"./config.js",
	"./lib/request.js",
	"./lib/xml2json.js",
],function(
	module,
	config,
	r,
	xml2json,
){
	if(config.enabled==false)return;
	var t0=new Date();
	var cmd={};//buildins
	var options={};
	var ret=null;
	//--------------------------------------------------------------------------------

	try{
		//--------------------------------------------------------------------------------
		//middleware:preprocessors
		//--------------------------------------------------------------------------------
		{
			var preprocret=true;
			config.preprocessor=typeof(config.preprocessor)=="string"?[config.preprocessor]:config.preprocessor;
			config.preprocessor.forEach(function(mod){
				try{
					switch(typeof(mod)){
						case"string":
							require([mod],function(cb){
								preprocret=preprocret&&(cb(r.parameters)!=false);
							}.bind(this));
							break;
						case"function":
							preprocret=preprocret&&(mod(r.parameters)!=false);
							break;
					}
				}catch(e){throw(e)}
			}.bind(this));
			if(!preprocret)return;
		}
		if(typeof(r.parameters.cmd)=="undefined"||r.parameters.cmd==null){
			throw("ECMD");
		}
		var cmdbuf=[];
		if(Array.isArray(r.parameters.cmd)){
			r.parameters.cmd.forEach(function(cmdobj){
				var options={};
				Object.keys(cmdobj).filter(function(k,v){
					return k!="cmd";
				}).forEach(function(k){
					options[k]=cmdobj[k];
				});
				cmdbuf.push({cmd:cmdobj.cmd,options:options});

			}.bind(this));
		}else{
			Object.keys(r.parameters).filter(function(k,v){
				return k!="cmd";
			}).forEach(function(k){
				options[k]=r.parameters[k];
			});
			cmdbuf.push({cmd:r.parameters.cmd,options:options});
		}
		var retbuf=[];
		cmdbuf.forEach(function(cmdobj,cmdidx){
			if(typeof(cmd[cmdobj.cmd])=="function"){
				try{
					if(r.parameters.pipe==true){
						retbuf.push(cmd[cmdobj.cmd](cmdidx==0?cmdobj.options:retbuf[0]));
						retbuf=[retbuf[0]];
					}else{
						retbuf.push(cmd[cmdobj.cmd](cmdobj.options));
					}
				}catch(e){
					retbuf.push({"error":e.toString()});
				}
			}else{
				//api cmds from ./cmd
				require([config.cmdpath+cmdobj.cmd],function(cb){
					if(typeof(cb)=="function"){
						if(r.parameters.pipe==true){
							retbuf.push(cb(cmdidx==0?cmdobj.options:retbuf[0]));
							retbuf=[retbuf[0]];
						}else{
							retbuf.push(cb(cmdobj.options));
						}
					}else{
						retbuf.push({"error":"EMOD"});
					}
				},function(e){
					retbuf.push({"error":e.toString()});
				});
			}
		}.bind(this));
		ret=retbuf.length==1?retbuf[0]:retbuf;


		/*
		Object.keys(r.parameters).filter(function(k,v){
			return k!="cmd";
		}).forEach(function(k){
			options[k]=r.parameters[k];
		});
		if(typeof(cmd[r.parameters.cmd])=="function"){
			try{
				ret=cmd[r.parameters.cmd](options);
			}catch(e){
				ret={"error":e.toString()};
			}
		}else{
			//api cmds from ./cmd
			require([config.cmdpath+r.parameters.cmd],function(cb){
				if(typeof(cb)=="function"){
					ret=cb(options);
				}else{
					ret={"error":"EMOD"};
				}
			},function(e){
				ret={"error":e.toString()};
			});
		}
		*/
		//--------------------------------------------------------------------------------
		//middleware:postprocessors
		//--------------------------------------------------------------------------------
		{
			var postprocret=true;
			config.postprocessor=typeof(config.postprocessor)=="string"?[config.postprocessor]:config.postprocessor;
			config.postprocessor.forEach(function(mod){
				var retref={val:ret}
				try{
					switch(typeof(mod)){
						case"string":
							require([mod],function(cb){
								postprocret=postprocret&&(cb(r.parameters,retref)!=false);
							}.bind(this));
							break;
						case"function":
							postprocret=postprocret&&(mod(r.parameters,retref)!=false);
							break;
					}
				}catch(e){throw(e)}
				ret=retref.val;
			}.bind(this));
			if(!postprocret)return;
		}
	}catch(e){
		ret={"error":e.toString()};
	}
	//--------------------------------------------------------------------------------
	//hdl ret
	//--------------------------------------------------------------------------------
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
});
@>
