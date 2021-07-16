define(["module"],function(module){
	function build0(obj,max,idx){
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
	function build(obj,splits,idx){
		if(typeof(obj)=="undefined")throw("obj null");
		if(typeof(splits)=="undefined")throw("splits null");
		if(typeof(idx)=="undefined")idx=8;
		//if(idx>max)return;
		for(var i=idx;i>0;i--){
			var child={"name":idx.toString(),"children":[]};
			obj.children.push(child);
			build(child,splits,idx-1);
		}
		return obj;
	}
	module.exports=function(options){
		var root={"name":"root","children":[]};
		options.itr=typeof(options.itr)=="number"?options.itr:4;
		options.splits=typeof(options.splits)=="number"?options.splits:4;
		build(root,options.splits,options.itr);
		return root;
	}
});
