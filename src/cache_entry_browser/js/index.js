(function(){$(document).ready(function(){
	var container=$("#output").addClass("output");
	var div_controls=$("<div/>").addClass("controls");
	var div_results=$("<div/>").addClass("results");
	var div_status=$("<pre/>").addClass("status");;
	var tbl_results=$("<table/>").addClass("results");
	container.append(div_controls);
	div_results.append(tbl_results);
	container.append(div_results);
	container.append(div_status);
	var div_style=$("<style/>").text(`

body{
	background:#111111;
	color:#888888;
}
.output{
	padding:8px;
	background:#222222;
}
.output .controls{
	color:#EEEEEE;
	background:#444444;
}
.output .controls input{
	background:#555555;
	color:#EEEEEE;
	border:unset;
}
.output button{
	background:#555555;
	color:#EEEEEE;
	border:unset;
}
.output .controls label{
	font-family:monospace;
}

.output .results{
	font-family:monospace;
	color:#EEEEEE;
	background:#333333;
}
.output table{
	width:100%;
}
.output tr{
overflow:hidden;
width:100%;
	display:flex;
}
.output tr:nth-child(odd){
	background:#333333;
}
.output tr:nth-child(even){
	background:#222222;;
}
.output td{
	padding:0px;
	margin:0px;
	border:unset;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical; 	
	overflow:hidden;
}	
.output td:nth-child(1){
	width:10%;
}
.output td:nth-child(2){
	width:10%;
}
.output td:nth-child(3){
	width:80%;
}
.output td span.highlighted{
	background:#880000;
	color:#FF8888;
}

	`);
	container.append(div_style);

	var label_msg=$("<label/>").text("create log: ");
	var input_msg=$("<input/>");
	input_msg.keyup(function(e){
		if(e.keyCode==13){
			offset=0;
			add_log(input_msg.val(),input_search.val());
			input_msg.val("");
		}
	}.bind(this));
	var label_search=$("<label/>").text("search: ");
	var input_search=$("<input/>");
	input_search.keyup(function(e){
		//if(e.keyCode==13){
			offset=0;
			render(limit,offset,input_search.val());
		//}
	}.bind(this));
	var button_msg=$("<button/>").text("create").click(function(a){
		offset=0;
		add_log(input_msg.val());
	});
	var button_clear=$("<button/>").text("clear").click(function(a){
		clear();
	});
	var limit=25;
	var offset=0;

	var div_pagination=$("<div/>").css({"float":"right"});
	var button_next=$("<button/>").text(">").click(function(a){
		offset+=limit;
		render(limit,offset,input_search.val());
	});
	var label_pagination=$("<label/>").text("...");

	var button_previous=$("<button/>").text("<").click(function(a){
		offset-=limit;
		offset=offset<0?0:offset;
		render(limit,offset,input_search.val());
	});

	div_pagination.append(label_pagination);
	div_pagination.append(button_previous);
	div_pagination.append(button_next);
	var sort="ASC";
	var label_sort=$("<label/>").text("sort: ");
	var button_sort=$("<button/>").click(function(a){
		switch(sort){
			case"ASC":
				sort="DESC";
				break;
			case"DESC":
				sort="ASC";
				break;
		}
		render(limit,offset);
		
	});
	var button_test=$("<button/>").text("test data").click(function(a){
		$.ajax({
			method:"post",
			url:"./api/",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({
				"cmd":"log",
				"action":"create_test_data",
				"debug":true
			}),
			success:function(r){
				update_status(r);
				render(limit,offset);

			}.bind(this),
			error:function(e){
				alert("ERR:"+JSON.stringify(r));
			}.bind(this)
		}).then(function(a){
			resolve();
		});

	});
	div_controls.append(label_search);
	div_controls.append(input_search);
	div_controls.append(button_clear);
	div_controls.append(div_pagination);



	div_controls.append(label_sort);
	div_controls.append(button_sort);
	div_controls.append(label_msg);
	div_controls.append(input_msg);
	div_controls.append(button_msg);
	div_controls.append(button_test);
	function render(limit,offset,query){
		button_sort.text(sort=="ASC"?"/\\":"\\/");
		limit=typeof(limit)=="undefined"?25:limit;
		offset=typeof(offset)=="undefined"?25:offset;
		return new Promise(function(resolve,reject){
			$.ajax({
				method:"post",
				url:"./api/",
				contentType:"application/json; charset=utf-8",
				data:JSON.stringify({
					"cmd":"log",
					"action":"query",
					"sort":sort,//"DESC",
					"offset":offset,
					"limit":limit,
					"query":query,
					"trim":true,
					"trimlength":80,
					"debug":true,
				}),
				success:function(r){
					tbl_results.empty();
					label_pagination.text((offset)+" to "+(offset+limit)+" out of "+(r.meta.total_rows));
					r.result.forEach(function(n,i){
						var tr_log=$("<tr/>")
						tr_log.append($("<td/>").append($("<button/>").text("Remove").click(function(){
							$.ajax({
								method:"post",
								url:"./api/",
								contentType:"application/json; charset=utf-8",
								data:JSON.stringify({
									"cmd":"log",
									"action":"remove",
									"id":n.id,
									"debug":true
								}),
								success:function(r){
									alert(JSON.stringify(r));
									console.log(r);
									render(limit,offset);
								}.bind(this),
								error:function(e){
									alert(JSON.stringify(r));
								}.bind(this)
							}).then(function(a){
							});
						})));

						tr_log.append($("<td/>").text(n.ts));
						tr_log.append($("<td/>").text(n.msg));
						tbl_results.append(tr_log);
if(typeof(query)!="undefined"&&query.length>0){
	var kw=query;
	$("td:nth-child(3)").each(function(e){
		var txt=$(this).text();
		var txtbuf=txt.split(kw);
		var spanbuf=[];
		txtbuf.forEach(function(t,tidx){
			spanbuf.push($("<span/>").text(t));
			if(tidx<txtbuf.length-1)spanbuf.push($("<span/>").addClass("highlighted").text(kw));
		}.bind(this))
			$(this).empty();
			$(this).append(spanbuf);

	});
	$("td:nth-child(2)").each(function(e){	
		var txt=$(this).text();
		var txtbuf=txt.split(kw);
		var spanbuf=[];
		txtbuf.forEach(function(t,tidx){
			spanbuf.push($("<span/>").text(t));
			if(tidx<txtbuf.length-1)spanbuf.push($("<span/>").css({"background-color":"#666666","color":"#FFFFFF","border-radius":"2px"}).text(kw));
		}.bind(this))
			$(this).empty();
			$(this).append(spanbuf);

	})

}
					}.bind(this));
					//log.text(JSON.stringify(r,0,2))
				}.bind(this),
				error:function(e){
					alert(JSON.stringify(r));
				}.bind(this)
			}).then(function(a){
				resolve();
			});
		});
	}
	function clear(){
		var t0=new Date();
		$.ajax({
			method:"post",
			url:"./api/",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({
				"cmd":"log",
				"action":"clear"
			}),
			success:function(r){
				update_status("Executed in "+(new Date()-t0)+" ms");
				render();
			}.bind(this),
			error:function(e){
				alert(JSON.stringify(r));
			}.bind(this)
		}).then(function(a){
			resolve();
		});
	}

	function add_log(msg){
		if(typeof(msg)=="undefined"||msg.length==0)throw("EMSG");
		var t0=new Date();
		$.ajax({
			method:"post",
			url:"./api/",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({
				"cmd":"log",
				"action":"create",
				"msg":msg,
				"debug":true
			}),
			success:function(r){
				offset=0;
				update_status("Executed in "+(new Date()-t0)+" ms");
				render(limit,offset);
			}.bind(this),
			error:function(e){
				alert(JSON.stringify(r));
			}.bind(this)
		}).then(function(a){
		});
	}
	function update_status(){
		div_status.text(JSON.stringify(arguments));
	}
	render(limit,offset);
	input_search.focus();
});})();
