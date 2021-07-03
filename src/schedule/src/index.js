<@
try{
	var K="sch_0";
	if(caching.Find(K)==null){
		channel
			.Schedules()
			.RegisterSchedule(
			    K,
			    {
				"Milliseconds":100
			    },
			    request
			)
		;
		var sch=channel.Schedules().Get(K);
		var busy=false;
		var dur=0;
		var idx=0;
		var t=new Date();
		caching.Put(K,{"sch":sch,"idx":idx,"busy":busy,"dur":dur,"t":t});
		sch.AddAction(
			(function(K){
				try{
					var data=caching.Find(K);
					var sch=caching.Find(K).Find("sch");
					var idx=caching.Find(K).Find("idx");
					var busy=caching.Find(K).Find("busy");
					var dur=caching.Find(K).Find("dur");
					var t=caching.Find(K).Find("t");
					if(!busy){
						console.Log("Work:"+idx+","+dur,","+t);
						busy=true;
						t=new Date();
						caching.Put(K,{"sch":sch,"idx":idx,"busy":busy,"dur":dur,"t":t});
						var t0=new Date();
						sleep(1000);//work
						var t1=new Date();
						var dur=t1-t0;
						busy=false;
						idx++;
						caching.Put(K,{"sch":sch,"idx":idx,"busy":busy,"dur":dur,"t":t});
					}else{
						console.Log("skip:"+idx);
					}
				}catch(e){
					console.Log(e.toString());
					return false;
				}
			}).toString(),
			[K]
		);
		sch.Start();
	}
}catch(e){
	println(e.toString());
}
@>
