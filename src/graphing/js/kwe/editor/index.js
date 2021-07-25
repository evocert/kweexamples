define([
	"module",
	"api/lib/storage.js",
	"js/jquery.js",
	"text!frag/index.html",
	"css!style/style.css",
	"js/kwe/kbd/index.js"
],function(
	module,
	storage,
	_jq,
	index
){
	function Editor(){
		this.init();
	};
	Editor.prototype.init=function(){
		var sf=new storage.StorageFactory();
		var s=sf.create({k:"code"});
		window.s=s;
		$("body").append($(index));
		function mkprogress(msg,timeout){
			var node=$("<div/>").addClass("progress");
			node.append(
				$("<div/>").text(typeof(msg)=="undefined"?"...":msg)
			);
			$("body").append(node);
			if(typeof(timeout)=="number"&&timeout>0){
				window.setTimeout(function(){node.remove()}.bind(this),timeout);
			}
			return node;
		};
		$("#run_srv").click(function(){
			var progress3=mkprogress("Running...",100);
			var src="";
			src+=$("#lib").val();
			src+="\n";
			src+=$("#srv").val()
			$.ajax({
				type: "POST",
				headers:{
					"Content-Type":"application/json"
				},
				url:"/kweexamples/src/graphing/api/?cmd=exec",
				data:src,
				complete: function(r){
					if(typeof(r.responseJSON)!="undefined"){
						$("#out").text(JSON.stringify(r.responseJSON,0,2));
					}else{
						$("#out").text(JSON.stringify(r.responseText));
					}
				}
			});
		});
		$("#run_cli").click(function(){
			var progress3=mkprogress("Running...",100);
			var ret;
			try{
				var src="";
				src+=$("#lib").val();
				src+="\n";
				src+=$("#cli").val()
				ret=eval(src);
			}catch(e){
				ret=e.toString();
			}
			$("#out").text(JSON.stringify(ret,0,2));
		});
		$("#sample").on("change",function(){
			loadSrc(this.value)
		});
		function loadlib(){
			if(typeof(s.get("lib"))!="undefined"){
				$("#lib").val(s.get("lib"));
				return;
			}
			//load lib
			$.ajax({
				method:"GET",
				url:"./res/storage.js",
				success:function(r){
					s.set("lib",r);
					$("#lib").val(r);
				}.bind(this),
				error:function(e){
					progress.remove();
					alert(JSON.stringify(r));
				}.bind(this)
			});
		}
		function loadSrc(path){
			if(typeof(s.get("srv"))!="undefined"&&
			   typeof(s.get("cli"))!="undefined"
			){
				$("#srv").val(s.get("srv"));
				$("#cli").val(s.get("cli"));
				return;
			}
			var progress=mkprogress("Loading src...");
			$.ajax({
				method:"GET",
				url:"./res/"+path+".js",
				success:function(r){
					s.init("srv",r);
					s.init("cli",r);
					progress.remove();
					$("#srv").val(r);
					$("#cli").val(r);
				}.bind(this),
				error:function(e){
					progress.remove();
					alert(JSON.stringify(r));
				}.bind(this)
			});
		}
		function save(){
			mkprogress("Saving...",100);
			s.set("srv",$("#srv").val());
			s.set("cli",$("#cli").val());
			s.set("lib",$("#lib").val());
		}
		$("#save").click(function(){save();});
		$("#reset").click(function(){
			mkprogress("Resetting...",100);
			s.clear();
			loadSrc("test0");
			loadlib();
		});
		loadSrc("test0");
		loadlib();
	};
	module.exports=Editor;
});
