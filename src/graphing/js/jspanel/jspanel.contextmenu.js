'use strict';if(!jsPanel.contextmenu){jsPanel.contextmenu={version:'1.1.2',date:'2020-01-18 15:00',defaults:{dragit:false,resizeit:false,header:false,headerControls:'none'},cmOverflow:function cmOverflow(elmt){var cltX=elmt.cmEvent.clientX,cltY=elmt.cmEvent.clientY,panelW=elmt.offsetWidth,panelH=elmt.offsetHeight,corrLeft=window.innerWidth-(cltX+panelW),corrTop=window.innerHeight-(cltY+panelH);if(corrLeft<0){elmt.style.left=cltX+(window.scrollX||window.pageXOffset)-panelW+'px';}
if(corrTop<0){elmt.style.top=cltY+(window.scrollY||window.pageYOffset)-panelH+'px';}},create:function create(){var _this=this;var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var evt=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'contextmenu';options.paneltype='contextmenu';var target=options.target;if(!target){return false;}
if(typeof target==='string'){target=document.querySelector(target);}
target.addEventListener(evt,function(e){e.preventDefault();document.querySelectorAll('.jsPanel-contextmenu').forEach(function(item){item.close();});var l=(e.pageX||e.touches[0].pageX)+'px',t=(e.pageY||e.touches[0].pageY)+'px',opts=options;if(options.config){opts=Object.assign({},options.config,options);delete opts.config;}
opts=Object.assign({},_this.defaults,opts,{position:false,container:'body'});jsPanel.create(opts,function(cm){jsPanel.setStyle(cm,{position:'absolute',left:l,top:t});var closestModal=target.closest('.jsPanel-modal');if(closestModal){cm.style.zIndex=closestModal.style.zIndex;}else{var closestPanel=target.closest('.jsPanel');if(closestPanel){closestPanel.front();}
cm.style.zIndex=jsPanel.zi.next();}
cm.cmEvent=e;jsPanel.contextmenu.cmOverflow(cm);cm.addEventListener('mouseleave',function(){cm.close();},false);jsPanel.pointerdown.forEach(function(evt){cm.addEventListener(evt,function(e){e.stopPropagation();});});});},false);}};jsPanel.ajaxAlwaysCallbacks.push(function(obj){if(obj.classList.contains('jsPanel-contextmenu')){jsPanel.contextmenu.cmOverflow(obj);}});jsPanel.pointerdown.forEach(function(evt){document.addEventListener(evt,function(e){document.querySelectorAll('.jsPanel-contextmenu').forEach(function(item){if(!e.target.closest('.jsPanel-contextmenu')){item.close();}});},false);});}
if(typeof module!=='undefined'){module.exports=jsPanel;}