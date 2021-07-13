<@
require([
	"./lib/domino/domino.js",
	"./lib/xpathjs/xpathjs.min.js",
],function(
	domino,
	XPathJS,
){
	try{
		//--------------------------------------------------------------------------------
		//setup
		//--------------------------------------------------------------------------------
		window=domino.createWindow("");
		document=window.document;
		//--------------------------------------------------------------------------------
		//load jquery and construct dom
		//    alternatively populate window=domino.createWindow(SOMEXML);
		//--------------------------------------------------------------------------------
		require("./lib/jquery/jquery-3.6.0.min.js");
		var $=window.$;
		$("body").append($("<h1/>").text("XPathJS Example:"));
		$("body").append($("<ul/>").append([
			$("<li/>").text("Red"),
			$("<li/>").text("Blue"),
			$("<li/>").text("Green")
		]));
		//--------------------------------------------------------------------------------
		//document contents
		//--------------------------------------------------------------------------------
		println("DOCUMENT:");
		println(document.documentElement.innerHTML);
		//--------------------------------------------------------------------------------
		//test
		//--------------------------------------------------------------------------------
		var bindings=XPathJS.createDomLevel3XPathBindings();
		{
			var query="//ul/li/text()";
			println("QUERY["+query+"]:");
			var result=bindings.document.evaluate(
				query,
				document,
				null,
				bindings.window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
			);
			for(var i=0;i<result.snapshotLength;i++){
				var node=result.snapshotItem(i);
				println(node.nodeValue);
			}
		}
		//--------------------------------------------------------------------------------
	}catch(e){
		println(e.toString());
	}
});
