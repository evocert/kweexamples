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
			if(typeof(options.out)!="string")throw("EOUT");
			if(typeof(options.recursive)!="boolean")options.recursive=false;
			if(options.recursive==true){
				if(
					(options.url.endsWith("/")||options.url.endsWith(".html")||options.url.endsWith(".htm"))
				){
					var links={};
					function build(base,url){
						if(options.debug==true)console.Log(url);
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
										try{
											var parser=new DomParser();
											var dom=parser.parseFromString(body);
											if(typeof(dom)=="undefined")return;
											var a=dom.getElementsByTagName("a");
											if(typeof(a)=="undefined")return;
											if(a.length==0)return;
											a.forEach(function(anod){
												var href=anod.getAttribute("href");
												if(typeof(href)=="undefined"||href==null||href.length==0)return;
												href=href.trim();
												if(href.indexOf("../")>0)return;//avoid relative for now
												if(href[0]=="#")return;//skip hashtags
												if(href[0]=="?")return;//skip qparams
												if(href.indexOf("mailto:")==0)return;//avoid mailto
												//if(href.indexOf("http://")==0)return;//skip direct links
												//if(href.indexOf("https://")==0)return;//skip direct links
												var extension=href.split(".").pop();
												//if(extension!="htm"&&extension!="html")return;//only htm/html files
												if(!links[href]){//avoid revisit
													links[href]=true;
													build(base,href);
												}
											}.bind(this));
										}catch(e){console.Log(e.toString());}
									}else{
										response.Reader().Close();
									}
								},
								"error":function(e){//<- does not fire
									console.Log(e.toString());
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
