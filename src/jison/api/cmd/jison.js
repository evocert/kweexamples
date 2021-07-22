define([
	"module",
	"../lib/jison/jison"
],function(
	module,
	_Jison
){
	module.exports=function(options){
		options=typeof(options)=="object"?options:{};
		if(Array.isArray(options.prg)){
			options.prg=options.prg.join("\n");
		}else if(typeof(options.prg)=="string"){
			options.prg=options.prg;
		}else{
			options.prg=[
				"2+4",
				"2-4",
				"2*4",
				"2/4",
			].join("\n");

		}
		options.srcpath=typeof(options.srcpath)=="string"?options.srcpath:"www/kweexamples/src/jison/api/src/calc.l";
		options.src=typeof(options.src)=="string"?null:options.src;
		//var out=request.fsutils().CATS("./index.js");//../src/calc.l")
		//console.Log(request.FS().CATS("./api/index.js"));//out;
		var src=null;
		if(options.src!=null){
			src=options.src;
		}else if(options.srcpath!=null){
			src=(_fsutils.CATS(options.srcpath));
		}
		options.debug=typeof(options.debug)=="boolean"?options.debug:false;
		var parser=new Jison.Parser(src);
		var cod=parser.generate();
		var parserSource=parser.generate({moduleName:"test"});
		var ret={};
		if(options.debug){
			ret.src=src;
			ret.cod=cod;
			ret.prg=options.prg;
		}
		ret.out=[];
		options.prg.split("\n").forEach(function(ln){
			try{
				ret.out.push(parser.parse(ln));
			}catch(e){
				ret.out.push(e.toString());
			}
		});
		return ret;
	}
});
