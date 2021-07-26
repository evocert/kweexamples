define([
	"module",
	"js/jquery.js"
],function(
	module,
	jq
){
	function uuidv4() {
		return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	function Progress(options){
		this.options=options;
		this.show();
	};
	Progress.prototype.show=function(){
		var options=this.options;
		options=typeof(options)=="object"?options:{};
		options.timeout=typeof(options.timeout)=="number"?options.timeout:-1;
		options.node=typeof(options.node)=="object"?options.node:document.body;
		options.id=typeof(options.id)=="string"?options.id:("progress_"+uuidv4());
		var id=options.id;
		options.style=typeof(options.style)=="string"?options.style:`
			#${id}{
	position:fixed;
	left:50%;
	top:50%;
	background:#666666;
	color:#FFFFFF;
	font-family:monospace;
	text-transform:uppercase;
	font-weight:bold;
	padding:4px;
	z-index:100;
			}
		`;
		options.msg=typeof(options.msg)=="string"?options.msg:"...";
		this.node=$("<div/>").attr({"id":options.id}).addClass("progress");
		this.node.append($("<style/>").text(eval("`"+options.style+"`")));
		try{this.node.append($("<div/>").text(typeof(options.msg)=="undefined"?"...":options.msg))}catch(e){console.error(e.toString());};
		$(options.node).append(this.node);
		if(options.timeout>0){
			window.setTimeout(function(){this.node.remove()}.bind(this),options.timeout);
		}

	};
	Progress.prototype.close=function(){
		this.node.remove();
	};
	module.exports=Progress;
	
});

