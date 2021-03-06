'use strict';function dockPanel(config,cb){var configDefault={position:{my:'left-top',at:'right-top'},linkSlaveHeight:false,linkSlaveWidth:false,callback:false},master,slave=document.getElementById(this.id);this.slaveconfig=Object.assign({},configDefault,config);if(this.slaveconfig.master&&this.slaveconfig.master.nodeType===1){master=this.slaveconfig.master;}else{master=document.querySelector(this.slaveconfig.master);}
if(!master){if(jsPanel.errorReporting){try{throw new jsPanel.jsPanelError('&#9664; COULD NOT DOCK PANEL &#9658;<br>The master panel does not exist in the document.');}catch(e){jsPanel.error(e);if(cb){cb.call(slave,slave);}}}
return false;}else{if(!master.slaves){master.slaves=new Set();}
if(!master.handlers){master.handlers={};}
if(!master.handlers.fronted){master.options.onfronted.push(function(){var zI=master.style.zIndex;master.slaves.forEach(function(sl){sl.style.zIndex=zI;});return true;});master.handlers.fronted=true;}
if(!master.handlers.smallified){master.options.onsmallified.push(function(){master.slaves.forEach(function(sl){sl.smallify().reposition();});return true;});master.handlers.smallified=true;}
if(!master.handlers.unsmallified){master.options.onunsmallified.push(function(){master.slaves.forEach(function(sl){sl.unsmallify().reposition();});return true;});master.handlers.unsmallified=true;}
if(!master.handlers.closed){master.options.onclosed.push(function(){master.slaves.forEach(function(sl){sl.close();});return true;});master.handlers.closed=true;}
if(!master.handlers.minimized){master.options.onminimized.push(function(){master.slaves.forEach(function(sl){sl.minimize();});return true;});master.handlers.minimized=true;}
if(!master.handlers.maximized){master.options.onmaximized.push(function(){master.slaves.forEach(function(sl){sl.normalize();if(sl.slaveconfig.linkSlaveHeight){var height=window.getComputedStyle(master).height;sl.resize({height:height});}
if(sl.slaveconfig.linkSlaveWidth){var width=window.getComputedStyle(master).width;sl.resize({width:width});}
sl.reposition();});return true;});master.handlers.maximized=true;}
if(!master.handlers.normalized){master.options.onnormalized.push(function(){master.slaves.forEach(function(sl){sl.normalize();if(sl.slaveconfig.linkSlaveHeight){var height=window.getComputedStyle(master).height;sl.resize({height:height});}
if(sl.slaveconfig.linkSlaveWidth){var width=window.getComputedStyle(master).width;sl.resize({width:width});}
sl.reposition();});return true;});master.handlers.normalized=true;}}
var position=Object.assign({},this.slaveconfig.position,{of:master,minLeft:false,minTop:false,maxLeft:false,maxTop:false,autoposition:false});if(!position.my){position.my=configDefault.position.my;}
if(!position.at){position.at=configDefault.position.at;}
slave.options.position=position;['smallify','minimize','normalize','maximize'].forEach(function(ctrl){slave.setControlStatus(ctrl,'remove');});if(this.slaveconfig.linkSlaveHeight){var height=window.getComputedStyle(master).height;slave.resize({height:height});}
if(this.slaveconfig.linkSlaveWidth){var width=window.getComputedStyle(master).width;slave.resize({width:width});}
slave.reposition(position);slave.dragit('disable');slave.resizeit('disable');slave.options.minimizeTo=false;slave.options.onclosed.push(function(){master.slaves["delete"](slave);});slave.options.onfronted.push(function(panel){var zI=panel.style.zIndex;master.style.zIndex=zI;master.slaves.forEach(function(sl){sl.style.zIndex=zI;});});master.reposSlave=function(){if(document.querySelector('#'+slave.id)){slave.reposition();}};if(master.options.dragit){master.options.dragit.drag.push(master.reposSlave);}
master.resizeSlave=function(){if(document.querySelector('#'+slave.id)){slave.reposition();if(slave.slaveconfig.linkSlaveHeight){var h=window.getComputedStyle(master).height;slave.resize({height:h});}
if(slave.slaveconfig.linkSlaveWidth){var w=window.getComputedStyle(master).width;slave.resize({width:w});}}};if(master.options.resizeit){master.options.resizeit.resize.push(master.resizeSlave);}
master.slaves.add(slave);slave.dockedTo=master.id;if(this.slaveconfig.callback){this.slaveconfig.callback.call(slave,master,slave);}
return slave;}
dockPanel.getVersion=function(){return '1.1.2';};dockPanel.getDate=function(){return '2020-01-14 14:00';};jsPanel.extend({dock:dockPanel});if(typeof module!=='undefined'){module.exports=jsPanel;}