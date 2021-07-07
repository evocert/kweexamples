define(["module"],function(module){
	module.exports=function(options){
		request.ResponseHeader().Set("Content-Type","application/json");
		try{
			if(typeof(options.url)!="string")throw("EURL");
			if(typeof(options.out)!="string")throw("EOUT");
			if(options.recursive==true){
				//todo: push into buffer
				//extract links
				//push buffer to file
				print(JSON.stringify({"status":"UNIMPLEMENTED"}));
			}else{
				var a=webing.Send(
					options.url
				);
				_fsutils.SET("./a.dat",a);
				print(JSON.stringify({"status":"OK","meta":{"url":options.url}}));
				//print(a);
			}
		}catch(e){
			print(JSON.stringify({"error":e.toString()}));
		}
	};
});
