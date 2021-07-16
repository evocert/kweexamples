define(["module"],function(module){
	function Request(options){};
	Request.prototype.tojson=function(){
		return {
			parameters:(function(){
				queryString=window.location.search;
				urlParams=new URLSearchParams(queryString);
				entries=urlParams.entries();
				ret={};
				entry=entries.next();
				if(!entry.done)
					do{
						ret[entry.value[0].toLowerCase()]=entry.value[1];
						try{
							ret[entry.value[0].toLowerCase()]=JSON.parse(ret[entry.value[0].toLowerCase()]);
						}catch(e){
						}
						entry=entries.next();
					}while(!entry.done);
				return ret;
			})(),
			headers:null,
			method:null,
			body:null
		}
	}
	var r=new Request({});
	module.exports=r;
});
