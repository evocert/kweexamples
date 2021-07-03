<@
	println("subscribe.js:start");
	try{
		var id="kwe_ockert_dell";
		var arr_topics=[
			{topic:"index",qos:0},
			{topic:"topic0",qos:0},
			{topic:"topic1",qos:0},
			{topic:"topic2",qos:0},
			{topic:"topic3",qos:0},
		];
		arr_topics.forEach(function(topicspec){
			//func (mqttmngr *MQTTManager) Subscribe(alias string, topic string, qos byte) (err error) {
			var topic=topicspec.topic;
			var qos=topicspec.qos;
			var err=mqtting.Subscribe(id,topic,qos);
			if(err==null){
				println(["monitor.js","subscribed",topic,qos].join(":"));
			}else{
				println(["monitor.js","failed to subscribe",topic,qos].join(":"));
			}
		});
	}catch(e){
		println("handling error;");
		println(e.toString()+";");
	}

	println("subscribe.js:end");
@>
