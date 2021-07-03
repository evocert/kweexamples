<@
	println("disconnect.js:start");
	try{
		var id="kwe_ockert_dell";
		var qos=0;
		println("disconnecting;")
		mqtting.Disconnect(id,qos);
		if(!mqtting.IsConnect(id)){
			println("disconnected;")
		}else{
			println("failed to disconnect;")
		}
	}catch(e){
		println("handling error;");
		println(e.toString()+";");
	}
	println("disconnect.js:end");
@>

