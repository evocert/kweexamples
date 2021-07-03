<@
	println("publish.js:start");
	var topics=[
		"index",
		"topic0",
		"topic1",
		"topic2",
		"topic3",
	];
	try{
		var t0=new Date();
		var id="kwe_ockert_dell";
		var nitr=32;//4096-8;//*8;
		var qos=1;
		var retained=false;
		for(var i=0;i<nitr;i++){
			var payload="PAYLOAD_"+i
			topics.forEach(function(topic){
				//println(["publish.js",topic,payload].join(":"));
				mqtting.Publish(
					id,
					topic,
					qos,
					retained,
					payload
				);
			});
		}
		var t1=new Date();
		println(1000*nitr/(t1-t0))
	}catch(e){
		println(e.toString());
	}
	println("publish.js:end");
@>

