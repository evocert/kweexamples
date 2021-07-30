define([
	"module",
	"ace",
	"js/kwe/progress/index",
	"text!./index.html",
	"api/lib/storage.js",
	"jquery",//js/jquery/jquery",
	"WinBox",
	"xterm",
	"xterm-addon-fit",
	"goldenlayout",
	"css!./index.css",
],function(
	module,
	ace,
	Progress,
	index,
	storage,
	_jq,
	WinBox,
	xterm,
	xaf,
	GoldenLayout
){
	$=_jq;
	var sf=new storage.StorageFactory();
	var s=sf.create({k:"code"});
	window.s=s;
	var editorsmap={};
	var curEditor=0;
	var editors=[];
	window.editors=editors;
	var Editor=function(options){
		options=typeof(options)=="undefined"?{}:options;
		options.node=typeof(options.node)=="undefined"?document.body:options.node;
		options.theme=typeof(options.theme)=="undefined"?"ace/theme/tomorrow_night_eighties":("ace/theme/"+options.theme);
		options.vi_keys=typeof(options.vi_keys)=="undefined"?false:options.vi_keys;
		options.commands=typeof(options.commands)=="undefined"?{}:options.commands;
		options.commands.save=typeof(options.commands.save)=="undefined"?function(){}:options.commands.save;
		options.commands.run=typeof(options.commands.run)=="undefined"?function(){}:options.commands.run;
		options.commands.load=typeof(options.commands.load)=="undefined"?function(){}:options.commands.load;
		options.val=typeof(options.val)=="undefined"?"":options.val;
		options.lines=typeof(options.lines)=="undefined"?10:options.lines;
		options.lang=typeof(options.lang)=="undefined"?null:options.lang;
		options.readOnly=typeof(options.readOnly)=="undefined"?false:options.readOnly;
		this.options=options;
		this.init(options);
	};
	Editor.prototype.init=function(options){
		window.editors.push(this);
		this.id="ace_"+new Date().getTime();
		this.div=$("<div/>").attr({"id":this.id});
		$(options.node).append(this.div);
		this.bool_vikeys=options.vi_keys;
		this.editor=ace.edit(options.node);
		this.editor.setValue(this.options.val,-1);
		this.editor.setTheme("ace/theme/tomorrow_night_eighties");//chaos");
		//editor.setHighlightActiveLine(true);
		//editor.setBehavioursEnabled(true);
		//editor.setShowPrintMargin(false);
		this.editor.on("commandExecuted",function(evt){});
		this.editor.setOptions({
			readOnly:options.readOnly,
			//minLines:this.options.lines,//20,
			//maxLines:this.options.lines,//20,
			//lines:24,
			autoScrollEditorIntoView:true,
			highlightActiveLine:false,
			//printMargin:false,
			//showGutter:false,
			//enableLiveAutocompletion:true,
			//enableBasicAutocompletion:true,
			//enableSnippets:false,
			//mode:"ace/mode/javascript",
			theme:options.theme,
		});
		this.editor.setKeyboardHandler("ace/keyboard/vim");//set prior to loading module...
		ace.config.loadModule(
			"ace/keyboard/vim",
			function(module){
				var VimApi=module.CodeMirror.Vim;
				VimApi.defineEx("write","w",function(cm,input){
					cm.ace.execCommand("save");
				});
				VimApi.defineEx("reload","r",function(cm,input){
					window.location.reload();
				});

			}
		);
		if(this.bool_vikeys){
			this.editor.setKeyboardHandler("ace/keyboard/vim");
			this.bool_vikeys=!this.bool_vikeys;

		}else{
			this.editor.setKeyboardHandler();
			this.bool_vikeys=!this.bool_vikeys;
		}
		//--------------------------------------------------------------------------------
		//toggle vi
		//--------------------------------------------------------------------------------
		this.editor.commands.addCommand(
			{
				name:"toggleVi",
				bindKey:{
					win:"Alt-J",
					mac:"Command-J",
					sender:"editor|cli"
				},
				exec:function(aceenv,aceargs,acerequest){
					if(this.bool_vikeys){
						this.editor.setKeyboardHandler("ace/keyboard/vim");
						this.bool_vikeys=!this.bool_vikeys;

					}else{
						this.editor.setKeyboardHandler();
						this.bool_vikeys=!this.bool_vikeys;
					}
				}.bind(this)
			}
		);
		//--------------------------------------------------------------------------------
		//save
		//--------------------------------------------------------------------------------
		this.editor.commands.addCommand(
			{
				name:"save",
				bindKey:{
					win:"Alt-W",
					mac:"Command-W",
					sender:"editor|cli"
				},
				exec:function(aceenv,aceargs,acerequest){
					this.save();
					//console.log(aceenv.getValue())
					//this.options.commands.save(aceenv.getValue());
					/*
					var r=args.component._controller._fileProvider._executeRequest(
						"SetFileContents",{
							"pathInfo":args.file.getFullPathInfo(),
							"value":aceenv.getValue(),
							"name":args.file.name
						}
					);
					r.then(function(val){
						aceenv.state.cm.openNotification(val.result,{bottom:true,duration:5000})
					}.bind(this),function(err){
						console.error(err);
						aceenv.state.cm.openNotification(val.errorText,{bottom:true,duration:5000});
					}.bind(this));
					*/
				}.bind(this)
			}
		);
		//--------------------------------------------------------------------------------
		//run
		//--------------------------------------------------------------------------------
		this.editor.commands.addCommand(
			{
				name:"run",
				bindKey:{
					win:"Alt-R",
					mac:"Command-R",
					sender:"editor|cli"
				},
				exec:function(aceenv,aceargs,acerequest){
					this.options.commands.run();
				}.bind(this)
			}
		);
		//this.editor.getSession().setMode("ace/mode/javascript");
		//this.editor.focus();
		/*
		this.editor.renderer.on("afterRender", function() {//return;
			//var nlines=Math.floor($(panel.content).height()/editor.renderer.lineHeight);
			var nlines=Math.floor(Math.random()*8);//2;//Math.floor($(this.editor.container).height()/this.editor.renderer.lineHeight);
			this.editor.setOptions({
				minLines:nlines,
				maxLines:nlines
			});
			$(this.editor.container).css({
				height:"100%",
				width:"100%"
			})
		}.bind(this));
		*/
		this.editor.session.setMode("ace/mode/"+this.options.lang)
				this.resize();
	}
	Editor.prototype.val=function(val){
		if(typeof(val)=="undefined")return this.editor.getValue();
		this.editor.setValue(val);
		this.editor.session.selection.clearSelection();
	}
	Editor.prototype.resize=function(){
		//var nlines=Math.floor($(panel.content).height()/editor.renderer.lineHeight);
		var nlines=Math.floor($(this.editor.container).height()/this.editor.renderer.lineHeight);
		this.editor.setOptions({
			minLines:nlines,
			maxLines:nlines
		});
		$(this.editor.container).css({
			height:"100%",
			width:"100%"
		});

	},
	Editor.prototype.toggleVi=function(val){
		val=typeof(val)=="boolean"?val:!this.bool_vikeys;
		if(this.bool_vikeys){
			this.editor.setKeyboardHandler("ace/keyboard/vim");
			this.bool_vikeys=!this.bool_vikeys;

		}else{
			this.editor.setKeyboardHandler();
			this.bool_vikeys=!this.bool_vikeys;
		}
	}
	Editor.prototype.load=function(path){
		this.path=path;
		if(typeof(s.get(path))!="undefined"){
			this.val(s.get(path));
			return;
		}
		//var progress=mkprogress("Loading src...");
		$.ajax({
			method:"GET",
			url:path,
			success:function(r){
				s.init(path);
				//progress.remove();
				this.val(r);
			}.bind(this),
			error:function(e){
				progress.remove();
				alert(JSON.stringify(r));
			}.bind(this)
		});
	}
	Editor.prototype.reload=function(){
		//var progress=mkprogress("Loading src...");
		$.ajax({
			method:"GET",
			url:this.path,
			success:function(r){
				s.init(this.path);
				//progress.remove();
				this.val(r);
			}.bind(this),
			error:function(e){
				progress.remove();
				alert(JSON.stringify(r));
			}.bind(this)
		});
	}

	Editor.prototype.save=function(){
		var progress=new Progress({msg:"saving",timeout:200});
		s.set(this.path,this.editor.getValue());
	}
	module.exports=function(){
		//--------------------------------------------------------------------------------
		var config={
			settings:{
				hasHeaders:true,
				constrainDragToContainer:true,
				reorderEnabled:true,
				selectionEnabled:true,
				popoutWholeStack:false,
				blockedPopoutsThrowError:true,
				closePopoutsOnUnload:true,
				showPopoutIcon:false,
				showMaximiseIcon:false,
				showCloseIcon:false
			},
			dimensions:{
				borderWidth:5,
				minItemHeight:0,
				minItemWidth:0,
				//headerHeight:20,
				dragProxyWidth:300,
				dragProxyHeight:200
			},
			labels:{
				close:"close",
				maximise:"maximise",
				minimise:"minimise",
				popout:"open in new window"
			},
			content:[
				{
					type:"column",
					content:[
						{
							type:"row",
							id:"row0",
							//width:1,
							height:6,

							content:[
								{
									hasHeaders: false,
									constrainDragToContainer: false,
									reorderEnabled: false,
									selectionEnabled: false,
									type:"component",
									title:"Menu",
									isClosable: false,
									componentName:"menuComponent",
									componentState:{},
									id: "menu",
									//width: 30,
									//height: 30,
									activeItemIndex: 1
								}
							]
						},
						{
							type:"row",
							id:"row1",
							content:[
								{
									type:"component",
									id:"edt_srv",
									title:"Server",
									isClosable: false,
									componentName:"editorComponent",
									componentState:{options:{path:"./res/test0_srv.js",val:"",lines:15,vi_keys:false,readOnly:false,theme:"monokai",commands:{run:function(){}}}}
								},{
									type:"component",
									id:"edt_cli",
									isClosable:false,
									title:"Client",
									//componentName:"renderComponent",
									componentName:"editorComponent",
									componentState:{options:{path:"./res/test0_cli.js",val:"",lines:15,vi_keys:false,readOnly:false,theme:"chaos",commands:{run:function(){}}}}
								}
							]
						},
						{
							type:"row",
							content:[
								{
									type:"component",
									title:"Library",
									id:"edt_lib",
									isClosable: false,
									componentName:"editorComponent",
									componentState:{options:{path:"./res/storage.js",val:"",lines:15,vi_keys:false,readOnly:false,theme:"chaos",commands:{run:function(){}}}}
								}
							]
						},
						{
							type:"row",
							content:[
								{
									type:"component",
									title:"Output",
									id:"edt_out",
									isClosable: false,
									componentName:"editorComponent",
									componentState:{options:{val:"",lines:15,vi_keys:false,readOnly:true,theme:"chaos",commands:{run:function(){}}}}
								}
							]
						}
					]
				}
			]
		};
		var div_wrapper_goldenlayout=$("body");
		var layout;
		var savedState=localStorage.getItem("savedState");
		if(savedState!==null){
			layout=new GoldenLayout(JSON.parse(savedState),div_wrapper_goldenlayout);
		}else{
			layout=new GoldenLayout(config,div_wrapper_goldenlayout);
		}
		layout.on("stateChanged",function(){
			var state=JSON.stringify( layout.toConfig());
			localStorage.setItem("savedState",state);
		});
		//layout=new GoldenLayout(config,div_wrapper_goldenlayout);
		window.m=layout;
		layout.registerComponent("menuComponent",function(container,componentState){
			var div=$("<div/>");
console.log("//container");
console.log(container);
console.log("//container");
			//container.getElement().css({"max-height":20});
			div.append($(`
				<div class="menu">
					<button id="run_srv" class="alt-u"style="">Run Srv<sup>[alt-u]</sup></button>
					<button id="run_cli" class="alt-i"style="">Run Cli<sup>[alt-i]</sup></button>
					<button id="reset" class="alt-q" tooltip="Alt-Q" style="">Reload Srv<sup>[alt-q]</sup></button>
					<button id="save" class="alt-w" tooltip="Alt-W" style="">Commit Loc<sup>[alt-w]</sup></button>
					<button id="commit" class="alt-c" tooltip="Alt-C" style="">Commit Srv<sup>[alt-c]</sup></button>
					<button id="vkeys" class="alt-k" tooltip="Alt-R" style="">Vi-keys <sup>[alt-k]</sup></button>
					<span style="">SRV/CLI Executor</span>
				</div>
			`));
			$(container.getElement()).append(div);
			container.on("tab",function(tab){
				//tab.setActive(false);
				tab.header.element.remove()
			});
		});
		layout.registerComponent("editorComponent",function(container,componentState){
			console.log("----");
			console.log(this);
			console.log(container);
			console.log("/----");
			if(componentState.options==null)return;
			var options=componentState.options;
			options.node=container.getElement()[0];
			container.editor=new Editor(options);
			if(options.path!=null)container.editor.load(options.path);
			editorsmap[container._config.id]=container.editor;
			//editors.push(container.editor.load(options.path));
			//$(container.getElement()).append(div_output)
			container.on("stateChanged",function(){
				container.editor.resize();
				//console.log("resize");return;////tab.setActive(false);
				//tab.header.element.remove()
			});
			container.editor.resize();
		}.bind(this));



		/*
		layout.on("initalised",function(a,b,c){
		});
		layout.on("windowCreated",function(a,b,c){
		});
		layout.on("windowClosed",function(a,b,c){
		});
		layout.on("selectionChanged",function(a,b,c){
		});
		layout.on("itemDestroyed",function(a,b,c){
		});
		layout.on("itemCreated",function(a,b,c){
		});
		layout.on("componentCreated",function(a,b,c){
		});
		layout.on("rowCreated",function(a,b,c){
		});
		layout.on("columnCreated",function(a,b,c){
		});
		layout.on("stackCreated",function(a,b,c){
		});
		layout.on("tab",function(a,b,c){
		});
		layout.on("tabCreated",function(a,b,c){
			console.log("tabCreated")
			console.log(this)
			console.log(this.options)
			console.log(arguments)
			console.log(a.contentItem);
			switch(a.contentItem.componentName){
				case"editorComponent":
					this.active_editor=a.contentItem.instance.editor;
					break;
				default:
					break;
			}
			//temp1.contentItem.instance
		}.bind(this));
		*/
		layout.on("stateChanged",function(){
			//var state=JSON.stringify(layout.toConfig());
			//localStorage.setItem("savedState",state);
//$($(".lm_splitter")[0]).remove()
		});
		layout.init();
//qwer=m.root.getItemsById("menu")[0]
//qwer.tab.element.remove()
		var runsrv=function(){
			var progress=new Progress({msg:"running server"});
			//var progress3=mkprogress("Running...",100);
			var src="";
			src+=editorsmap.edt_lib.val();
			src+="\n";
			src+=editorsmap.edt_srv.val()
			$.ajax({
				type: "POST",
				headers:{
					"Content-Type":"application/json"
				},
				url:"/kweexamples/src/graphing/api/?cmd=exec",
				data:src,
				complete: function(r){
					progress.close();
					if(typeof(r.responseJSON)!="undefined"){
						editorsmap.edt_out.val(JSON.stringify(r.responseJSON,0,2));
					}else{
						editorsmap.edt_out.val(JSON.stringify(r.responseText));
					}
				}
			});
		};
		$("#run_srv").click(runsrv);
		var runcli=function(){
			var progress=new Progress({msg:"running client",timeout:200});
			//var progress3=mkprogress("Running...",100);
			var ret;
			try{
				var src="";
				src+=editorsmap.edt_lib.val();
				src+="\n";
				src+=editorsmap.edt_cli.val();
				ret=eval(src);
			}catch(e){
				ret=e.toString();
			}
			editorsmap.edt_out.val(JSON.stringify(ret,0,2));
		};
		var toggleVi=function(){
			var progress=new Progress({msg:"toggling vi-keys",timeout:200});
			editors.forEach(function(e){
				e.toggleVi();
			});
		};
		$("#run_cli").click(runcli);
		$("#vkeys").click(toggleVi);
		$("#save").click(function(){
			var progress=new Progress({msg:"saving",timeout:200});
			editors.forEach(function(e){
				e.save();
			});
		});
		$("#commit").click(function(){
			editors.forEach(function(e){
				if(typeof(e.path)=="undefined")return;
				var progress=new Progress({msg:"comitting "+e.path+"..."});
				$.ajax({
					method:"POST",
					url:"./api/",
					headers:{"Content-Type":"application/json"},
					data:JSON.stringify({
						cmd:"fs",
						operation:"set",
						content:e.editor.getValue(),
						path:e.path
					}),
					success:function(r){
						new Progress({msg:JSON.stringify(r),timeout:300});
						progress.close();
						//alert(JSON.stringify(r));
					}.bind(this),
					error:function(e){
						progress.close();
						new Progress({msg:"failed to commit "+e.path+"...",timeout:200});
					}.bind(this)
				});
				//alert(e.path);
			});
		});
		$("#reset").click(function(){
			var progress=new Progress({msg:"resetting",timeout:200});
			edt_cli.reload();
			edt_srv.reload();
			edt_lib.reload();
		});
		//--------------------------------------------------------------------------------
		$(document).on("keydown",function(e){
			if(e.altKey&&e.key=="n"){
				curEditor++;
				if(curEditor>editors.length-1)curEditor=0;
				if(editors.length>0)editors[curEditor].editor.focus();
			}
			if(e.altKey&&e.key=="+"){
				var curlines=editors[curEditor].editor.getOption("maxLines");
				editors[curEditor].editor.setOption("minLines",curlines+1);
				editors[curEditor].editor.setOption("maxLines",curlines+1);
			}
			if(e.altKey&&e.key=="-"){
				var curlines=editors[curEditor].editor.getOption("maxLines");
				curlines=curlines<1?1:curlines;
				editors[curEditor].editor.setOption("minLines",curlines-1);
				editors[curEditor].editor.setOption("maxLines",curlines-1);
			}


			if(e.altKey&&e.key=="p"){
				curEditor--;
				if(curEditor<0)curEditor=editors.length-1;
				if(editors.length>0)editors[curEditor].editor.focus();
			}
			if(!e.ctrlKey&&e.altKey&&e.key.length==1){
				//e.stopPropagation();
				//e.preventDefault();
				$("."+"alt-"+e.key).click();
				//if($("."+"alt-"+e.key).length==0)return;
				//if(($("."+"alt-"+e.key)[0].type=="textarea"||$("."+"alt-"+e.key)[0].type=="input")||(e.target.type!="textarea"&&e.target.type=="input"))
				//$("."+"alt-"+e.key).focus();
				$("."+"alt-"+e.key).find("textarea").focus();
			}
			if(e.ctrlKey&&e.altKey&&e.key.length==1){
				//e.stopPropagation();
				//e.preventDefault();
				$("."+"ctrl-alt-"+e.key).click();
				if($("."+"ctrl-alt"+e.key).length==0)return;
				if(($("."+"ctrl-alt-"+e.key)[0].type=="textarea"||$("."+"alt-"+e.key)[0].type=="input")||(e.target.type!="textarea"&&e.target.type=="input"))
				$("."+"ctrl-alt-"+e.key).focus();
			}
		});
		//--------------------------------------------------------------------------------
		/*
		window.setTimeout(function(){
			var fitAddon=new xaf.FitAddon();
			var term;
			var wb=new WinBox({
				id: "xterm",
				//class: ["no-full", "my-theme"],
				root: document.body,
				title: "xterm.js",
				background: "#fff",
				border: 4,
				width: 200,
				height: 200,
				//x: "center",
				//y: "center",
				max: false,
				splitscreen: true,
				//top: 50,
				//right: 50,
				bottom: 0,
				left: 50,
				//html: "width: 200, height: 200",
				onfocus: function(){
				fitAddon.fit();
					//this.setBackground("#fff");
				},
				onblur: function(){
					//this.setBackground("#999");
				},
				onresize: function(width, height){
				fitAddon.fit();
					//this.body.textContent = (
					//	"width: " + width + ", " +
					//	"height: " + height
					//);
				},
				onmove: function(x, y){
					//this.body.textContent = (
					//	"x: " + x + ", " +
					//	"y: " + y
					//);
				},
				onclose: function(force){
					return !confirm("Close window?");
				}
			});
			term=new xterm.Terminal();
			term.open(wb.body);
			term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ")	
			term.onKey(e => {
				//console.log(e.key);
				term.write(e.key);
				if (e.key == "\r")
				term.write("\n");
			})
			term.loadAddon(fitAddon);
			window.fitAddon=fitAddon;
			window.term=term;
			fitAddon.fit();
		}.bind(this),500);
		*/
	};




});



