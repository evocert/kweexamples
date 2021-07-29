define([
	"module",
	"jquery",
	"jquery-ui",
	"WinBox",
	"text!./index.html",
],function(
	module,
	_jq,
	_jqu,
	WinBox,
	index
){
	$=_jq;
	var Menu=function(){
		$("body").append($(index));
		var position = {my: "left top", at: "left bottom+8"};
		$( "#menu" ).menu({
		    position: position,
		    blur: function() {
			$(this).menu("option", "position", position);
		    },
		    focus: function(e, ui) {
			if ($(menu).get(0) !== $(ui).get(0).item.parent().get(0)) {
			    $(this).menu("option", "position", {my: "left top", at: "left top"});
			}
		    }
		});
		actions={
			about:function(){
				/*
				$(`<div id="dialog" title="About">
				  <p>KWE Editor</p>
				</div>`).dialog();
				*/
		new WinBox({
			//class:"modern",
			title:"About",
			html:"<p>Kwe Editor v0.0.1</p>",
			x:"center",
			y:"center",
			width:"256px",
			height:"128px"
		});
			},
			help:function(){
				$(`<div id="dialog" title="Help">
				  <p>Some help text...</p>
				</div>`).dialog();
			},
			runsrv:function(){runsrv()},
			runcli:function(){runcli()},
		}
		$("#menu li").click(function () {
		    var id = $(this).data('action'); 
			if(id!=null&&actions[id]!=null)actions[id]();
		});
	};
	module.exports=Menu;
});
