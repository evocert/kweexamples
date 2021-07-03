<@
	println("connect.js:start");
	try{
		var id="kwe_ockert_dell";
		println("registering...");
		var registered=typeof(mqtting.Connections().find(function(k){
			return k==id;
		}.bind(this)))=="string";
		if(!registered){
			mqtting.RegisterConnection(
				id,
				{
					"broker":"localhost",//"skullquake.dedicated.co.za",
					"port":1883,
					"user":"",
					"password":""
				}
			);
			println("done");
		}else{
			println("already registered");
		}
		if(!mqtting.IsConnect(id)){
			println("connecting...");
			mqtting.Connect(id);
			println("done");
		}else{
			println("already connected");
		}
	}catch(e){
		println(["error",e.toString()].join(":"));
	}
	println("connect.js:end");
@>

