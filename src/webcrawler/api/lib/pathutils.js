define(["module"],function(module){
	function absolute(base,relative){
		/* original
		var stack=base.split("/"),parts=relative.split("/");
		stack.pop();
		for(var i=0;i<parts.length;i++){
			if(parts[i]==".")
			continue;
			if(parts[i]=="..")
				stack.pop();
			else
				stack.push(parts[i]);
		}
		stack=stack.filter(function(comp){return comp.length>0;});
		var path=stack.join("/");
		return path;
		*/
		var stack=[];
		var parts=relative.split("/");
		stack.pop();
		for(var i=0;i<parts.length;i++){
			if(parts[i]==".")
			continue;
			if(parts[i]=="..")
				stack.pop();
			else
				stack.push(parts[i]);
		}
		stack=stack.filter(function(comp){return comp.length>0;});
		base=base.split("/");
		base.pop();
		var path=base.concat(stack.join("/"));
		path=path.join("/");
		return path;
	}
	module.exports={
		absolute:absolute
	}
});
