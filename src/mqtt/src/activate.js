<@
	println("activate.js:start");
	try{
		var arr_topics=[
			{topic:"index",path:"/mqtt/hdl/index.js"},
			{topic:"topic0",path:"/mqtt/hdl/topic0.js"},
			{topic:"topic1",path:"/mqtt/hdl/topic1.js"},
			{topic:"topic2",path:"/mqtt/hdl/topic2.js"},
			{topic:"topic3",path:"/mqtt/hdl/topic3.js"},
		];
		arr_topics.forEach(function(topicspec){
			//func (mqttmngr *MQTTManager) ActivateTopic(topic string, topicpath ...string) {
			var topic=topicspec.topic;
			var path=topicspec.path;
			var err=mqtting.ActivateTopic(topic,path);
			if(err==null){
				println(["activate.js","activated",topic,path].join(":"));
			}else{
				println(["activate.js","failed to activate",topic,path].join(":"));
			}
		});
	}catch(e){
		println("handling error;");
		println(e.toString()+";");
	}
	println("activate.js:end");
@>
