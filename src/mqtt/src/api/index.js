<@
try{
	require(["./request.js"],function(r){
		var data=r.data();
		var cmd={
			edtcon:function(){
				var id=data.alias
				var coninfo=JSON.parse(mqtting.ConnectionInfo(id));
				print(`
					<div id="edtcon">
						<label>alias....</label><input name="alias" value="`+coninfo.ClientID+`"></input><br/>
						<label>broker...</label><input name="broker" value="`+coninfo.broker+`"></input><br/>
						<label>port.....</label><input name="port" value="`+coninfo.port+`"></input><br/>
						<label>user.....</label><input name="user" value="`+coninfo.user+`"></input><br/>
						<label>password.</label><input name="password" value="`+coninfo.password+`"></input><br/>
						<button class="alt-s" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=addcon&oid=`+id+`&con=`+mqtting.IsConnect(id)+`" form_ref="#edtcon">Save <sup>alt-s</sup></button>
					</div>
				`);
			},
			getcons:function(){
				print(`<table>`)
				mqtting.Connections().sort().forEach(function(con,conidx){
					var kbdidx=conidx+1;
					var connected=mqtting.IsConnect(con);
					print(`<tr>`);
					print(`<td style="font-weight:bold;padding-left:4px;padding-right:4px;background:`+(connected?"#88CC88":"#888844")+`;color:`+(connected?"#008800":"#CCCC88")+`;">`+con+`</td>`);
					print(`<td><button class="alt-`+kbdidx+`" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=edtcon&alias=`+con+`" form_ref="#addcon">edit<sup>alt-`+kbdidx+`</sup></button></td>`);
					print(`<td><button style="width:152px;" class="ctrl-`+kbdidx+`" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=`+(connected?"disconnect":"connect")+`&alias=`+con+`" form_ref="#addcon">`+(connected?"disconnect":"connect")+`<sup>ctrl-`+kbdidx+`</sup></button></td>`);
					print(`<td><button onClick="postElem(this)" target="#output" url_ref="./api/?cmd=remcon&alias=`+con+`" form_ref="#addcon">remove</button></td>`);
					print(`<td><button onClick="postElem(this)" target="#output" url_ref="./api/?cmd=publish&alias=`+con+`">publish</button></td>`);
					print(`<td><button class="ctrl-alt-`+kbdidx+`" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=getsubs&alias=`+con+`">subs <sup>CTRL_ALT-`+kbdidx+`</sup></button></td>`);
					print(`</tr>`);
				});
				print(`</table>`)
			},
			newcon:function(){
				var alias="new_"+mqtting.Connections().length;
				print(`
					<div id="addcon">
						<label>alias....</label><input name="alias" value="`+alias+`"></input><br/>
						<label>broker...</label><input name="broker" value="localhost"></input><br/>
						<label>port.....</label><input name="port" value="1883"></input><br/>
						<label>user.....</label><input name="user" value=""></input><br/>
						<label>password.</label><input name="password" value=""></input><br/>
						<button class="alt-s" id="btn0" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=addcon" form_ref="#addcon">Save <sup>alt-s</sup></button>
					</div>
				`);
			},
			remcon:function(){
				mqtting.UnregisterConnection(data.alias);
				this.getcons();
			},
			addcon:function(){
				try{
					var id=data.alias;
					var oid=data.oid
					if(oid){
						try{mqtting.Disconnect(data.oid);}catch(e){println(e.toString());}
						try{mqtting.UnregisterConnection(data.oid);}catch(e){println(e.toString());}
					}
					var registered=typeof(mqtting.Connections().find(function(k){
						return k==id;
					}.bind(this)))=="string";
					if(!registered){
						mqtting.RegisterConnection(
							id,
							{
								"broker":data.broker,
								"port":parseInt(data.port),
								"user":data.user,
								"password":data.password
							}
						);
					}else{
						print("already registered");
					}
					/*
					*/
				}catch(e){
					print(["error",e.toString()].join(":"));
				}
				this.getcons();

			},
			connect:function(){
				try{
					var id=data.alias;
					if(mqtting.IsConnect(id)){
						print("already connected");
					}else{
						mqtting.Connect(id);
					}

				}catch(e){
					print(["error",e.toString()].join(":"));
				}
				this.getcons();
			},
			disconnect:function(){
				try{
					var id=data.alias;
					if(mqtting.IsConnect(data.alias)){
						mqtting.Disconnect(id);
					}else{
						print("already disconnected");
					}

				}catch(e){
					print(["error",e.toString()].join(":"));
				}
				this.getcons();

			},
			publish:function(){
				if(mqtting.IsConnect(data.alias)){
					if(data.alias!=null&&data.topic!=null&&data.payload!=null){
						mqtting.Publish(
							data.alias,
							data.topic,
							0,
							true,
							data.payload
						);
					}else{
					}

					print(`<div id="publish">
						<p>`+data.alias+`</p>
						<label>topic....</label><input value="`+(data.topic==null?"Topic":data.topic)+`" name="topic"></input></br>
						<label>payload..</label><input value="`+(data.payload==null?"Payload":data.payload)+`" name="payload"></input></br>
						<button autofocus="true" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=publish&alias=`+data.alias+`" form_ref="#publish">send <sup>ALT+S</sup></button>
					</div>`)
				}else{
					print(`not connected`);
					this.getcons();
				}
			},
			getsubs:function(){
				print(`<table></tr>`);
				var subs=mqtting.Subscriptions(data.alias);
				subs.forEach(function(s,i){
					s=JSON.parse(s);
					s.alias=data.alias
					print(`<tr>`);
					print(`<td style="font-weight:bold;padding-left:4px;padding-right:4px;background:#888844;color:#CCCC88;">`+s.topic+`</td>`);
					print(`<td style="font-weight:bold;padding-left:4px;padding-right:4px;background:#884488;color:#CC88CC;">qos:`+s.qos+`</td>`);
					print(`<td><button class="alt-`+i+`" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=editsub&alias=`+s.alias+`&topic=`+s.topic+`&qos=`+s.qos+`">Edit <sup>ALT+`+i+`</sup></button></td>`);
					print(`<td><button class="ctrl-`+i+`" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=remsub&alias=`+s.alias+`&topic=`+s.topic+`">Remove <sup>CTRL-`+i+`</sup></button></td>`);
					print(`</tr>`);
				});
				print(`</table>`);
				print(`<button class="alt-n" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=editsub&alias=`+data.alias+`&topic=topic_`+(subs.length+1)+`&qos=0">New <sup>ALT-N</sup></td>`);
			},
			editsub:function(){
				var topic=(data.topic==null?"Topic":data.topic);
				var payload=(data.payload==null?"Payload":data.payload);
				var qos=(data.qos==null?"0":data.qos);
				var alias=data.alias;
				print(`<div id="publish">
					<p>Edit Subscription: `+alias+`</p>
					<label>topic....</label><input value="`+topic+`" name="topic"></input></br>
					<label>payload..</label><input value="`+payload+`" name="payload"></input></br>
					<label>qos......</label><input value="`+qos+`" name="qos"></input></br>
					<button class="alt-s" autofocus="true" onClick="postElem(this)" target="#output" url_ref="./api/?cmd=addsub&alias=`+data.alias+`" form_ref="#publish">save <sup>alt+s</sup></button>
				</div>`)

			},
			addsub:function(){
				try{
					if(mqtting.IsSubscribed(data.alias,data.topic)){
						print("already subscribed");
					}else{
						var err=mqtting.Subscribe(data.alias,data.topic,parseInt(data.qos));
						print("added");
					}
				}catch(e){
					print(e);
				}
				this.getsubs();
			},
			remsub:function(){
				try{mqtting.Unsubscribe(data.alias,data.topic);print("removed");}catch(e){print(e.tostring());}
				this.getsubs();
			},
			gettopics:function(){
				print(mqtting.ActiveTopics())
			},
		}
		if(typeof(cmd[data.cmd])=="function")cmd[data.cmd]();else print("Invalid command");
		print('<script>console.log('+JSON.stringify(r.tojson())+');</script>');
	});
}catch(e){
	print(e.toString());
}
@>
