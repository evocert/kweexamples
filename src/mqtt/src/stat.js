<@
//console.Log("index:start");
println("./stat.js:start");
try{
	var K="mqtt";
	if(caching.Find(K)==null){
		caching.Put(K,0);
	}
	var acc=caching.Find(K);
	println("./stat.js:"+acc)
	acc=acc+1;
	var acc=caching.Put(K,acc);
}catch(e){
	println(["stat.js","error",e.toString()].join(":"));
}
println("./stat.js:end");
//console.Log("index:end");
@>
