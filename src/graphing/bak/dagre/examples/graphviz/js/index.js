// Input related code goes here

function graphToURL() {
/*
	var elems=[window.location.protocol, '//',
		window.location.host,
		window.location.pathname,
		'?'
	];
	var queryParams=[];
	if(debugAlignment){
		queryParams.push('alignment='+debugAlignment);
	}
	queryParams.push('graph='+encodeURIComponent(inputGraph.value));
	elems.push(queryParams.join('&'));
	return elems.join('');
*/
}
var inputGraph=document.querySelector("#inputGraph");
var graphLink=d3.select("#graphLink");
var oldInputGraphValue;
var graphRE=/[?&]graph=([^&]+)/;
var graphMatch=window.location.search.match(graphRE);
if(graphMatch){
	inputGraph.value=decodeURIComponent(graphMatch[1]);
}
var debugAlignmentRE=/[?&]alignment=([^&]+)/;
var debugAlignmentMatch=window.location.search.match(debugAlignmentRE);
var debugAlignment;
if(debugAlignmentMatch)debugAlignment=debugAlignmentMatch[1];
// Set up zoom support
var svg=d3.select("svg"),
		inner=d3.select("svg g"),
		zoom=d3.zoom().on("zoom",function(){
			inner.attr("transform",d3.event.transform);
		});
svg.call(zoom);
// Create and configure the renderer
var render=dagreD3.render();
var g;
function tryDraw(){
	if(oldInputGraphValue!==inputGraph.value) {
		inputGraph.setAttribute("class","");
		oldInputGraphValue=inputGraph.value;
		try{
			g=graphlibDot.read(inputGraph.value);
console.log(g);
		}catch(e){
			inputGraph.setAttribute("class","error");
			throw e;
		}
		// Save link to new graph
		graphLink.attr("href",graphToURL());
		// Set margins, if not present
		if(!g.graph().hasOwnProperty("marginx")&&!g.graph().hasOwnProperty("marginy")){
var body = document.body,
    html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
			g.graph().marginx=document.body.getClientRects()[0].width/4;//80;
			g.graph().marginy=height/3;//80;
		}
		g.graph().transition=function(selection) {
			return selection.transition().duration(500);
		};
		//apply interpolation
g.edges().forEach(function(e){
	g.setEdge(e, {
	  //label: "line interpolation different",
	  curve: d3.curveBasis 
	});
}.bind(this));
		// Render the graph into svg g
		d3.select("svg g").call(render, g);
	}
}
