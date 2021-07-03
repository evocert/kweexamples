<@
//console.Log("index:start");
try{
	var K="mqtt";
	if(caching.Find(K)==null){
		caching.Put(K,0);
	}
	var acc=caching.Find(K);
	acc=acc+1;
	var acc=caching.Put(K,acc);
	//console.Log(["index",mqttmsg.String()].join(":"));
}catch(e){
	//console.Log(["index","error",e.toString()].join(":"));
}
//console.Log("index:end");
@>

