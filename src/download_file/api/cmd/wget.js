define(["module"],function(module){
	module.exports=function(options){
		try{
			if(typeof(options.url)!="string")throw("EURL");
			if(typeof(options.out)!="string")throw("EOUT");
			if(options.recursive==true){
				//todo: push into buffer
				//extract links
				//push buffer to file
				request.ResponseHeader().Set("Content-Type","application/json");
				print(JSON.stringify({"status":"UNIMPLEMENTED"}));
			}else{
				var a=webing.Send(
					options.url
				);
				if(options.out=="-"){
					print(a);
				}else{
					throw("EACCESS");
					_fsutils.SET("./a.dat",options.out);
					request.ResponseHeader().Set("Content-Type","application/json");
					print(JSON.stringify({"status":"OK","meta":{"url":options.url,"out":options.out}}));
				}
				//print(a);
			}
		}catch(e){
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify({"error":e.toString()}));
		}
	};
});
