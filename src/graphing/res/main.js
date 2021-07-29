const config={
	env:{
		//memoryBase:0,
		__memory_base:0,
		//tableBase:0,
		__table_base:0,
		memory:new WebAssembly.Memory({
			initial:256,
		}),
		table:new WebAssembly.Table({
			initial:0,
			element:'anyfunc',
		}),
		_imp0:function(){console.log("_imp0");},
		_imp1:function(x){console.log("_imp1:"+JSON.stringify(x));}
	}
};
WebAssembly.instantiateStreaming(fetch("./index.wasm"),config)
	.then(
		function(module){
			window.module=module;
			var val=module.instance.exports.seven();
			console.log(val);
			document.getElementById("output").innerText=val;
			module.instance.exports.call_imp0();
			module.instance.exports.call_imp1(24);
		},
		function(err){console.error(err)}
	);
