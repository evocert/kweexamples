define([
	"module",
	"js/jquery.js"
],function(
	module,
	_jq
){
	$(document).on("keydown",function(e){
		var id=new Date().getTime();
		if(e.ctrlKey&&!e.altKey&&e.key.length==1){
			//e.stopPropagation();
			//e.preventDefault();
			$("."+"ctrl-"+e.key).click();
			if($("."+"ctrl-"+e.key).length==0)return;
			if(($("."+"ctrl-"+e.key)[0].type=="textarea"||$("."+"alt-"+e.key)[0].type=="input")||(e.target.type!="textarea"&&e.target.type=="input"))
			$("."+"ctrl-"+e.key).focus();
		}
		if(!e.ctrlKey&&e.altKey&&e.key.length==1){
			//e.stopPropagation();
			//e.preventDefault();
			$("."+"alt-"+e.key).click();
			if($("."+"alt-"+e.key).length==0)return;
			if(($("."+"alt-"+e.key)[0].type=="textarea"||$("."+"alt-"+e.key)[0].type=="input")||(e.target.type!="textarea"&&e.target.type=="input"))
			$("."+"alt-"+e.key).focus();
		}
		if(e.ctrlKey&&e.altKey&&e.key.length==1){
			//e.stopPropagation();
			//e.preventDefault();
			$("."+"ctrl-alt-"+e.key).click();
			if($("."+"ctrl-alt"+e.key).length==0)return;
			if(($("."+"ctrl-alt-"+e.key)[0].type=="textarea"||$("."+"alt-"+e.key)[0].type=="input")||(e.target.type!="textarea"&&e.target.type=="input"))
			$("."+"ctrl-alt-"+e.key).focus();
		}
	});

});

