<@
	println("unsubscribe.js:start");
	try{
		var arr_topics=[
			{topic:"index"},
			{topic:"topic0"},
			{topic:"topic1"},
			{topic:"topic2"},
			{topic:"topic3"},
		];
		arr_topics.forEach(function(topicspec){
			//func (mqttmngr *MQTTManager) Subscribe(alias string, topic string, qos byte) (err error) {
			var topic=topicspec.topic;
			var qos=topicspec.qos;
			var err=mqtting.Unsubscribe(topic);
			if(err==null){
				println(["monitor.js","unsubscribed",topic,path].join(":"));
			}else{
				println(["monitor.js","failed to unsubscribe",topic,path].join(":"));
			}
		});
	}catch(e){
		println("handling error;");
		println(e.toString()+";");
	}

	println("unsubscribe.js:end");
@>

