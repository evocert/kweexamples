define([
	"module",
	"js/jquery.js"
],function(
	module,
	jq
){
	var incubator=$("<div/>").attr({"id":"progress_incubator"}).css({
		"position":"fixed",
		"right":"10px",
		"bottom":"10px",
		"z-index":"100"
	});
	$("body").append(incubator);
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
		options.node=incubator;
		options.id=typeof(options.id)=="string"?options.id:("progress_"+uuidv4());
		var id=options.id;
		options.style=typeof(options.style)=="string"?options.style:`
#${id}{
	background:linear-gradient(#444444,#222222);
	color:#CCCCCC;
	font-family:monospace;
	font-weight:bold!important;
	text-transform:uppercase;
	font-weight:bold;
	padding:12px;
	z-index:100;
	border:1px solid #444444;
	margin-bottom:8px;
	position:relative;
}
#${id}:after{
	content:'';
	background:linear-gradient(#FF0000,#880000)!important;


/*background: linear-gradient(to bottom, #cd45e9, #264ae5, #7568ff, #2dbafc, #88e288, #ffda65, #e33f4e, #cd45e9);
animation: gradient 3s linear infinite;
*/

	width:8px!important;;
	height:100%!important;;
	position:absolute;
	left:-8px;
	top:-1px;
	border:1px solid #FF0000;
	margin-bottom:8px;
}

		`;
		options.msg=typeof(options.msg)=="string"?options.msg:"...";
		this.node=$("<div/>").attr({"id":options.id}).addClass("progress");
		this.node.append($("<style/>").text(eval("`"+options.style+"`")));
		try{this.node.append($("<div/>").text(typeof(options.msg)=="undefined"?"...":options.msg))}catch(e){console.error(e.toString());};
		this.node.hide();
		this.node.fadeIn("fast",function() {
		});
		$(options.node).append(this.node);
		if(options.timeout>0){
			window.setTimeout(function(){
				this.close();
			}.bind(this),options.timeout);
		}

	};
	Progress.prototype.close=function(){
		this.node.fadeOut("fast", function() {
			this.node.remove();
		}.bind(this));
	};
	module.exports=Progress;
	
});

