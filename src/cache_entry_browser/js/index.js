(function(){$(document).ready(function(){
	var container=$("#output").addClass("output");
	var div_controls=$("<div/>").addClass("controls");
	var div_results=$("<div/>").addClass("results");
	var log=$("<pre/>").addClass("log");;
	var tbl_results=$("<table/>").addClass("results");
	container.append(div_controls);
	div_results.append(tbl_results);
	container.append(div_results);
	container.append(log);
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
.output .controls button{
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
	var button_next=$("<button/>").text(">").click(function(a){
		offset+=limit;
		render(limit,offset,input_search.val());
	});
	var button_previous=$("<button/>").text("<").click(function(a){
		offset-=limit;
		offset=offset<0?0:offset;
		render(limit,offset,input_search.val());
	});
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
	div_controls.append(label_search);
	div_controls.append(input_search);
	div_controls.append(button_clear);
	div_controls.append(button_previous);
	div_controls.append(button_next);
	div_controls.append(label_sort);
	div_controls.append(button_sort);
	div_controls.append(label_msg);
	div_controls.append(input_msg);
	div_controls.append(button_msg);
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
					"debug":true
				}),
				success:function(r){
					tbl_results.empty();
					r.result.forEach(function(n,i){
						var tr_log=$("<tr/>")
						tr_log.append($("<td/>").text(n.ts));
						tr_log.append($("<td/>").text(n.msg));
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
									console.log(r);
									render(limit,offset);
								}.bind(this),
								error:function(e){
									alert(JSON.stringify(r));
								}.bind(this)
							}).then(function(a){
							});
						})));
						tbl_results.append(tr_log);
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
		$.ajax({
			method:"post",
			url:"./api/",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({
				"cmd":"log",
				"action":"clear"
			}),
			success:function(r){
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
				render(limit,offset);
			}.bind(this),
			error:function(e){
				alert(JSON.stringify(r));
			}.bind(this)
		}).then(function(a){
		});
	}
	render(limit,offset);
	input_search.focus();
});})();
