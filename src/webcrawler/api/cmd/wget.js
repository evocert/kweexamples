define([
	"module",
	"lib/pathutils.js",
	"lib/domparser/DomParser.js"
],function(
	module,
	pathutils,
        DomParser
){
	absolute=pathutils.absolute;
	module.exports=function(options){
		try{
			if(typeof(options.url)!="string")throw("EURL");
			//if(typeof(options.output)!="string")throw("EOUT");//unimplemented
			if(typeof(options.maxdepth)!="number")options.maxdepth=Infinity;
			if(typeof(options.maxvisit)!="number")options.maxvisit=Infinity;
			if(typeof(options.recursive)!="boolean")options.recursive=false;
			if(typeof(options.handler)!="string")options.handler=null;
			if(typeof(options.delay)!="number")options.delay=0;
			ridx=0;
			maxr=options.maxvisit;
			maxdepth=options.maxdepth;
			if(options.recursive==true){
				if(
					(options.url.endsWith("/")||options.url.endsWith(".html")||options.url.endsWith(".htm"))
				){
					var links={};
					if(options.debug==true)console.Log("-".repeat(80));
					function build(base,url,depth){
						//if(options.delay>0)sleep(options.delay);
						if(ridx>maxr)return;
						if(depth>maxdepth)return;
						depth=typeof(depth)=="number"?depth:0;
						if(options.debug==true)console.Log("["+ridx+"]"+"-".repeat(depth)+absolute(base,url));
						if(links[absolute(base,url)])return;
						links[absolute(base,url)]=true;
						ridx++;
						webing.Send(
							//(absolute("","http://localhost:8081/foo/bar/../baz/../qux/../../klutz"));
							//->http://localhost:8081/klutz
							absolute(base,url),
							{
								"success":function(method,response){
									var hkarr=response.Headers();
									var contentType=response.Header("Content-Type")
									if(typeof(contentType)=="string"&&contentType.indexOf("text/html")==0){
										var body=response.Reader().ReadAll();
										response.Reader().Close();
										if(options.handler!=null){
											require([options.handler],function(handler){
												handler(absolute(base,url),body);
											});
										}
										try{
											var parser=new DomParser();
											var dom=parser.parseFromString(body);
											if(typeof(dom)=="undefined")return;
											var a=dom.getElementsByTagName("a");
											if(typeof(a)=="undefined")return;
											if(a.length==0)return;
											var hrefbuf=[];
											a.forEach(function(anod){try{
												var href=anod.getAttribute("href");
												if(typeof(href)=="undefined"||href==null||href.length==0)return;
												if(href.indexOf("../")>0)return;//avoid relative for now
												if(href[0]=="#")return;//skip hashtags
												if(href[0]=="?")return;//skip qparams
												if(href.indexOf("mailto:")==0)return;//avoid mailto
												if(href.indexOf("http://")==0)return;//skip direct links
												if(href.indexOf("https://")==0)return;//skip direct links
												href=href.trim();
												if(href[0]!="/")href=url+href;//hdl rel
												//var extension=href.split(".").pop();
												//if(extension!="htm"&&extension!="html")return;//only htm/html files
												build(base,href,depth+1);
											}catch(e){console.Log(e.toString());}}.bind(this));
										}catch(e){console.Log(e.toString());}
									}else{
										response.Reader().Close();
									}
								},
								"error":function(e){//<- does not fire
									console.Log("XXX:"+e.toString());
								}
							}
						);
					}
					build(options.url,"/")
					request.ResponseHeader().Set("Content-Type","application/json");
					print(JSON.stringify({"links":links},0,2));
				}else{
					throw("unhandled url type");
				}
			}else{
				throw("EIMPL");
			}
		}catch(e){
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify({"error":e.toString()}));
		}
	};
});
