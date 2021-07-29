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
	"css!./index.css"
],function(
	module,
	ace,
	Progress,
	index,
	storage,
	_jq,
	WinBox,
	xterm,
	xaf
){
	$=_jq;
	//$("body").append(div_term);
	var sf=new storage.StorageFactory();
	var s=sf.create({k:"code"});
	window.s=s;
	var editors=[];
	var curEditor=0;
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
		this.div=$("<div/>").attr({"id":this.id});//.css({"height":"200px"});
		$(options.node).append(this.div);
		this.bool_vikeys=options.vi_keys;//false;
		this.editor=ace.edit(this.id);
		this.editor.setValue(this.options.val,-1);
		//editor.setTheme("ace/theme/tomorrow_night_eighties");//chaos");
		//editor.setHighlightActiveLine(true);
		//editor.setBehavioursEnabled(true);
		//editor.setShowPrintMargin(false);
		this.editor.on("commandExecuted",function(evt){});
		this.editor.setOptions({
			readOnly:options.readOnly,
			minLines:this.options.lines,//20,
			maxLines:this.options.lines,//20,
			//lines:24,
			autoScrollEditorIntoView:true,
			highlightActiveLine:false,
			//printMargin:false,
			//showGutter:false,
			//enableLiveAutocompletion:true,
			//enableBasicAutocompletion:true,
			//enableSnippets:false,
			mode:"ace/mode/javascript",
			theme:options.theme,
		});
		this.editor.setKeyboardHandler("ace/keyboard/vim");//set prior to loading module...
		ace.config.loadModule(
			'ace/keyboard/vim',
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
					*/
					/*
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

		//editor.getSession().setMode("ace/mode/c");
		this.editor.focus();
		/*
		editor.renderer.on('afterRender', function() {
			//var nlines=Math.floor($(panel.content).height()/editor.renderer.lineHeight);
			var nlines=32;//Math.floor($(div).height()/editor.renderer.lineHeight);
			editor.setOptions({
				minLines:nlines,
				maxLines:nlines
			});
			$(editor.container).css({
				height:"100%",
				width:"100%"
			})
		}.bind(this));
		*/
		this.editor.session.setMode("ace/mode/"+this.options.lang)
	}
	Editor.prototype.val=function(val){
		if(typeof(val)=="undefined")return this.editor.getValue();
		this.editor.setValue(val);
		this.editor.session.selection.clearSelection();
	}
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
		var div=$("<div/>").css({});
		index=$(index);
		div.append(index);
		var div0=$("<div/>").css({"display":"flex"});
		var divedt0=$("<div/>").css({"height":"auto","width":"50%"}).addClass("alt-1");
		divedt0.append($("<div/>").addClass("title").text("Server").append($("<sup/>").text("[alt-1]")));
		var divedt1=$("<div/>").css({"height":"auto","width":"50%"}).addClass("alt-2");
		divedt1.append($("<div/>").addClass("title").text("Client").append($("<sup/>").text("[alt-2]")));
		div0.append(divedt0);
		div0.append(divedt1);
		var div1=$("<div/>").css({});
		div1.append($("<div/>").addClass("title").text("Library").append($("<sup/>").text("[alt-2]")));
		var divedt2=$("<div/>").css({"height":"auto","width":"100%"}).addClass("alt-3");
		var div2=$("<div/>").css({});
		div2.append($("<div/>").addClass("title").text("Output").append($("<sup/>").text("[alt-3]")));
		var divedt3=$("<div/>").css({"height":"auto","width":"100%"}).addClass("alt-4");
		div1.append(divedt2);
		div2.append(divedt3);
		div.append(div0)
		div.append(div1)
		div.append(div2)
		$("body").append(div);
		var edt_srv_opts=s.init("edt_srv",{vi_keys:false});
		var edt_cli_opts=s.init("edt_cli",{vi_keys:false});
		var edt_lib_opts=s.init("edt_lib",{vi_keys:false});
		var edt_out_opts=s.init("edt_out",{vi_keys:false});
		var edt_srv=new Editor({node:divedt0,val:"",lines:10,vi_keys:edt_srv_opts.vi_keys,lang:"javascript",commands:{run:function(){runsrv();}}});
		var edt_cli=new Editor({node:divedt1,val:"",lines:10,vi_keys:edt_cli_opts.vi_keys,lang:"javascript",commands:{run:function(){runcli();}}});
		var edt_lib=new Editor({node:divedt2,val:"",lines:10,vi_keys:edt_lib_opts.vi_keys,lang:"javascript",commands:{run:function(){}}});
		var edt_out=new Editor({node:divedt3,val:"",lines:15,vi_keys:edt_out_opts.vi_keys,readOnly:true,theme:"chaos",commands:{run:function(){}}});
		edt_srv.load("./res/test0_srv.js");
		edt_cli.load("./res/test0_cli.js");
		edt_lib.load("./res/storage.js");
		var runsrv=function(){
			var progress=new Progress({msg:"running server"});
			//var progress3=mkprogress("Running...",100);
			var src="";
			src+=edt_lib.val();
			src+="\n";
			src+=edt_srv.val()
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
						edt_out.val(JSON.stringify(r.responseJSON,0,2));
					}else{
						edt_out.val(JSON.stringify(r.responseText));
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
				src+=edt_lib.val();
				src+="\n";
				src+=edt_cli.val();
				ret=eval(src);
			}catch(e){
				ret=e.toString();
			}
			edt_out.val(JSON.stringify(ret,0,2));
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

window.setTimeout(function(){
var fitAddon=new xaf.FitAddon();
        var term;
	var wb=
new WinBox({

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
	/*
        this.setBackground("#fff");
	*/
    },
    onblur: function(){
	/*
        this.setBackground("#999");
	*/
    },
    onresize: function(width, height){
	fitAddon.fit();
	/*
        this.body.textContent = (
            "width: " + width + ", " +
            "height: " + height
        );
	*/
    },
    onmove: function(x, y){
	/*
        this.body.textContent = (
            "x: " + x + ", " +
            "y: " + y
        );
	*/
    },
    onclose: function(force){
        return !confirm("Close window?");
    }
});

        term=new xterm.Terminal();
        term.open(wb.body);
        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')	
	term.onKey(e => {
	    //console.log(e.key);
	    term.write(e.key);
	    if (e.key == '\r')
		term.write('\n');
	})
term.loadAddon(fitAddon);
window.fitAddon=fitAddon;
	window.term=term;
fitAddon.fit();

}.bind(this),500);


		//m=new Menu();
	};
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



});
