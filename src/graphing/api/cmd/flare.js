define([
	"module"
],function(
	module
){
	//http://localhost:1031/kweexamples/src/graphing/?splits=3&minwidth=5&maxwidth=10&die=true&minitr=100
	function buildrnd(obj,max,idx){
		if(typeof(obj)=="undefined")throw("obj null");
		if(typeof(max)=="undefined")throw("max null");
		if(typeof(idx)=="undefined")idx=0;
		if(idx>max)return;
		var nchildren=Math.floor(Math.random()*2+((max-idx)/max));
		for(var i=0;i<nchildren;i++){
			var child={"name":idx.toString(),"children":[]};
			obj.children.push(child);
			build(child,max,idx+1);
		}
		return obj;
	}
	var curwidth=0;
	function build(obj,splits,itr,minwidth,maxwidth,die,maxitr,minitr){
		if(itr>=minitr)return obj;
		if(curwidth>=1&&curwidth>minwidth&&die)if(Math.random()<0.5){
			curwidth-=2;
			return obj;
		}
		var cursplits=splits;
		if(curwidth>=maxwidth)cursplits=1;
		for(var i=0;i<cursplits;i++){
			var child={"name":itr.toString(),"children":[]};
			obj.children.push(child);
			curwidth++;
			build(child,splits,itr+1,minwidth,maxwidth,die,maxitr,minitr);
		}
		return obj;
	}
	module.exports=function(options){
		var root={"name":"root","children":[]};
		options.maxitr=typeof(options.maxitr)=="number"?options.maxitr:4;
		options.splits=typeof(options.splits)=="number"?options.splits:4;
		options.maxwidth=typeof(options.maxwidth)=="number"?options.maxwidth:4;
		options.minwidth=typeof(options.minwidth)=="number"?options.minwidth:2;
		options.minitr=typeof(options.minitr)=="number"?options.minitr:4;
		options.die=typeof(options.die)=="boolean"?options.die:4;
		build(root,options.splits,0,options.minwidth,options.maxwidth,options.die,options.maxitr,options.minitr);
		return root;
	}
});
