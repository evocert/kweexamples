'use strict';if(!jsPanel.modal){jsPanel.modal={version:'1.2.5',date:'2020-04-26 23:23',defaults:{closeOnEscape:true,closeOnBackdrop:true,dragit:false,headerControls:'closeonly',resizeit:false,syncMargins:false},addBackdrop:function addBackdrop(id){var modalCount=document.getElementsByClassName('jsPanel-modal-backdrop').length,mb=document.createElement('div');mb.id='jsPanel-modal-backdrop-'+id;if(modalCount===0){mb.className='jsPanel-modal-backdrop';}else if(modalCount>0){mb.className='jsPanel-modal-backdrop jsPanel-modal-backdrop-multi';}
mb.style.zIndex=this.ziModal.next();return mb;},removeBackdrop:function removeBackdrop(id){var mb=document.getElementById("jsPanel-modal-backdrop-".concat(id));mb.classList.add('jsPanel-modal-backdrop-out');var delay=parseFloat(getComputedStyle(mb).animationDuration)*1000;window.setTimeout(function(){document.body.removeChild(mb);},delay);},create:function create(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};options.paneltype='modal';if(!options.id){options.id="jsPanel-".concat(jsPanel.idCounter+=1);}else if(typeof options.id==='function'){options.id=options.id();}
var opts=options,backdrop=this.addBackdrop(opts.id);if(options.config){opts=Object.assign({},options.config,options);delete opts.config;}
opts=Object.assign({},this.defaults,opts,{container:'window'});document.body.append(backdrop);return jsPanel.create(opts,function(modal){modal.style.zIndex=jsPanel.modal.ziModal.next();modal.header.style.cursor='default';modal.footer.style.cursor='default';if(opts.closeOnBackdrop){jsPanel.pointerup.forEach(function(evt){document.getElementById("jsPanel-modal-backdrop-".concat(opts.id)).addEventListener(evt,function(){modal.close(null,true);});});}
modal.options.onclosed.unshift(function removeModalBackdrop(){jsPanel.modal.removeBackdrop(opts.id);return true;});});}};jsPanel.modal.ziModal=function(){var val=jsPanel.ziBase+10000;return{next:function next(){return val++;}};}();}
if(typeof module!=='undefined'){module.exports=jsPanel;}