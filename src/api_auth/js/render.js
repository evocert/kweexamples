define([
	"module",
	"jquery",
	"parsing",
],function(
	module,
	$,
	parsing
){
	var render=function(opts){
		opts=typeof(opts)=="object"?opts:{};
		if(opts.target==undefined)throw("ETGT");
		opts.data=typeof(opts.data)=="undefined"?opts.root:opts.data;
		if(opts.template==undefined)opts.template=frag_examples
		opts.target.empty();
		var src="";
		opts.beglbl="[[";
		opts.endlbl="]]";
		opts.print=function(val){if(typeof(val)=="undefined")return;src+=val;};
		var prsng=opts
		parsing(
			opts,
			opts.template
		);
		var nod=$("<div/>").html(src)
		var srcbuf=[];
		var scripts=nod.find("script");
		scripts.each(function(){
			srcbuf.push($(this).text());
		});
		scripts.remove();
		opts.target.append(nod);
		srcbuf.forEach(function(src){
			eval(src);
		}.bind(this));
		$(opts.target).find("a").click(function(tgt){
			var id=$(this).attr("id")
			var template=$(this).data("template");
			if(template){
				require(["text!"+template],function(template){
					if(typeof(template)=="undefined"||template==null){
						throw("ETPL");
					}
					{
						opts.target.empty();
						var optsclone={};
						Object.keys(opts).forEach(function(k){optsclone[k]=opts[k]});
						optsclone.template=template;
						optsclone.parent=this;
						render(optsclone);
					}
				});
			}
		});
	};
	module.exports=render;
});

