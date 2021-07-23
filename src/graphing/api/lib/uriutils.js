define(["module"],function(module){
	function encodeUriComponent(input){
		var ret=[];
		var glyphs=" ";
		input.split("").forEach(function(c){
			if(true||glyphs.indexOf(c)!=-1)
				ret.push("%"+c.charCodeAt(0).toString(16));
			else
				ret.push(c);
		});
		return ret.join("").replace(/\ /g,"+");
	}
	module.exports=encodeUriComponent;
});
