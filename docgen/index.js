<@
	try{
		var filelist=[];
		var base="./www/kweexamples/";
		_fsutils.FIND("./www/kweexamples/src").filter(function(e){
			return e.Name().endsWith(".md");
		}).forEach(function(e){
			filelist.push(e.Path().substring(base.length));
		}.bind(this));
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify(filelist));
		_fsutils.SET("./www/kweexamples/docgen/data.json",JSON.stringify(filelist));
	}catch(e){
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify({"error":e.toString()}));
	}
@>
