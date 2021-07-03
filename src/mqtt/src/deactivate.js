<@
	println("deactivate.js:start");
	try{
		var arr_topics=[
			"index",
			"topic0",
			"topic1",
			"topic2",
			"topic3",
		];
		arr_topics.forEach(function(topic){
			var err=mqtting.DeactivateTopic(topic);
			if(err==null){
				println(["deactivate.js","deactivated",topic].join(":"));
			}else{
				println(["deactivate.js","failed to deactivate",topic].join(":"));
			}
		});
	}catch(e){
		println("handling error;");
		println(e.toString()+";");
	}
	println("deactivate.js:end");
@>
