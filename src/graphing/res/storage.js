//lib Sat Jul 24 11:37:01 SAST 2021
//https://journal.stuffwithstuff.com/2014/12/21/rooms-and-mazes/
//todo:impl evocert caching.MapAPI
//--------------------------------------------------------------------------------
var defaults={
	store:{
		k:"a"
	}
}
//--------------------------------------------------------------------------------
function getEnv(){
	var ret=null;
	if(typeof(println)=="function"){
		ret="SERVER";
	}else{
		ret="CLIENT";
	}
	return ret;
};
function functionName(func){
    var result = /^function\s+([\w\$]+)\s*\(/.exec( func.toString() )
    return  result  ?  result[ 1 ]  :  '' // for an anonymous function there won't be a match
};
//--------------------------------------------------------------------------------
var LogFactory=function(){};
LogFactory.prototype.create=function(options){
	switch(getEnv()){
		case"SERVER":
			return new ServerLogger(options);
			break;
		case"CLIENT":
			return new ClientLogger(options);
			break;
		default:
			throw("EENV");
			break;
	}
}
//--------------------------------------------------------------------------------
var AbstractLogger=function(){
	this.buffer=[];
};
AbstractLogger.prototype.log=function(){
	throw("EABSTRACT");
};
AbstractLogger.prototype.flush=function(){
	var ret=this.buffer;
	this.buffer=[];
	return ret;
};
//--------------------------------------------------------------------------------
var ClientLogger=function(){};
var ClientLogger=function(){
	AbstractLogger.call(this/*,args*/);
};
ClientLogger.prototype=Object.create(AbstractLogger.prototype);
ClientLogger.prototype.log=function(){};
ClientLogger.prototype.log=function(){
	console.log.apply(this,arguments);
	this.buffer.push((function(args){
		var ret=[];
		Object.values(args).forEach(function(v){
			ret.push(typeof(v)=="object"?JSON.stringify(v):v);
		});
		return ret.join(",");
	})(arguments));
};
//--------------------------------------------------------------------------------
var ServerLogger=function(){};
var ServerLogger=function(){
	AbstractLogger.call(this/*,args*/);
};
ServerLogger.prototype=Object.create(AbstractLogger.prototype);
ServerLogger.prototype.log=function(){
	console.Log.apply(this,arguments);
	//println.apply(this,arguments);
	this.buffer.push((function(args){
		var ret=[];
		Object.values(args).forEach(function(v){
			ret.push(typeof(v)=="object"?JSON.stringify(v):v);
		});
		return ret.join(",");
	})(arguments));

};
//--------------------------------------------------------------------------------
var logf=new LogFactory();
var logger=logf.create();
//--------------------------------------------------------------------------------
var AbstractStorageFactory=function(){};
AbstractStorageFactory.prototype.create=function(){throw("EABSTRACT");};
//--------------------------------------------------------------------------------
var StorageFactory=function(){};
var StorageFactory=function(){
	AbstractStorageFactory.call(this/*,args*/);
};
StorageFactory.prototype=Object.create(AbstractStorageFactory.prototype);
StorageFactory.prototype.create=function(options){
	switch(getEnv()){
		case"SERVER":
			return new ServerStorage(options);
			break;
		case"CLIENT":
			return new ClientStorage(options);
			break;
		default:
			throw("EENV");
			break;
	}
};
//--------------------------------------------------------------------------------
var AbstractStorage=function(){};
AbstractStorage.prototype.init=function(k,v){throw("EABSTRACT");};
AbstractStorage.prototype.toString=function(){throw("EABSTRACT");};
AbstractStorage.prototype.toJson=function(){throw("EABSTRACT");};
//Keys 	(...interface{}) []interface{}
AbstractStorage.prototype.Keys=function(){throw("EABSTRACT");};
//Values 	(...interface{}) []interface{}
AbstractStorage.prototype.Values=function(){throw("EABSTRACT");};
//IsMap 	(...interface{}) bool
AbstractStorage.prototype.IsMap=function(){throw("EABSTRACT");};
//Exists 	(...interface{}) bool
AbstractStorage.prototype.Exists=function(){throw("EABSTRACT");};
//Find 	(...interface{}) interface{}
AbstractStorage.prototype.Find=function(){throw("EABSTRACT");};
//Put 	(interface{}, ...interface{}) bool
AbstractStorage.prototype.Put=function(){throw("EABSTRACT");};
//Remove 	(...interface{})
AbstractStorage.prototype.Remove=function(){throw("EABSTRACT");};
//Fprint 	(io.Writer, ...interface{}) error
AbstractStorage.prototype.Fprint=function(){throw("EABSTRACT");};
//String 	(...interface{}) string
AbstractStorage.prototype.String=function(){throw("EABSTRACT");};
//Focus 	(...interface{}) bool
AbstractStorage.prototype.Focus=function(){throw("EABSTRACT");};
//Reset 	(...interface{}) bool
AbstractStorage.prototype.Reset=function(){throw("EABSTRACT");};
//Clear 	(...interface{}) bool
AbstractStorage.prototype.Clear=function(){throw("EABSTRACT");};
//Close 	(...interface{}) bool
AbstractStorage.prototype.Close=function(){throw("EABSTRACT");};
//IsMapAt 	(interface{}, ...interface{}) bool
AbstractStorage.prototype.IsMapAt=function(){throw("EABSTRACT");};
//ExistsAt 	(interface{}, ...interface{}) bool
AbstractStorage.prototype.ExistsAt=function(){throw("EABSTRACT");};
//Push 	(interface{}, ...interface{}) int
AbstractStorage.prototype.Push=function(){throw("EABSTRACT");};
//Pop 	(interface{}, ...interface{}) interface{}
AbstractStorage.prototype.Pop=function(){throw("EABSTRACT");};
//Shift 	(interface{}, ...interface{}) int
AbstractStorage.prototype.Shift=function(){throw("EABSTRACT");};
//Unshift 	(interface{}, ...interface{}) interface{}
AbstractStorage.prototype.Unshift=function(){throw("EABSTRACT");};
//At 	(interface{}, ...interface{}) interface{}
AbstractStorage.prototype.At=function(){throw("EABSTRACT");};
//FocusAt 	(interface{}, ...interface{}) bool
AbstractStorage.prototype.FocusAt=function(){throw("EABSTRACT");};
//ClearAt 	(interface{}, ...interface{}) bool
AbstractStorage.prototype.ClearAt=function(){throw("EABSTRACT");};
//CloseAt 	(interface{}, ...interface{}) bool
AbstractStorage.prototype.CloseAt=function(){throw("EABSTRACT");};
//--------------------------------------------------------------------------------
var Storage=function(options){
	AbstractStorage.call(this/*,args*/);
	options=typeof(options)=="object"?options:{};
	this.k=typeof(options.k)=="string"?options.k:defaults.store.k;
	this.isnew=true;
	this.load();
};
Storage.prototype=Object.create(AbstractStorage.prototype);
Storage.prototype.setdata=function(data){
	this.data=data;
}
Storage.prototype.init=function(k,v){
	if(this.get(k)==null)this.set(k,v);
	return this.get(k);
}
//--------------------------------------------------------------------------------
var ClientStorage=function(){
	if(getEnv()!="CLIENT")throw("EENV");
	Storage.call(this/*,args*/);
	this.cursur=null;
};
ClientStorage.prototype=Object.create(Storage.prototype);
ClientStorage.prototype.commit=function(){
	try{
		localStorage.setItem(this.k,JSON.stringify(this.data));
	}catch(e){
		console.error(e);throw(e);
	}
}
ClientStorage.prototype.load=function(){
	try{
		if(localStorage.getItem(this.k)==null){
			this.isnew=true;
			localStorage.setItem(this.k,JSON.stringify({}));
		}
		this.setdata(JSON.parse(localStorage.getItem(this.k)));
		this.cursor=this.data;
	}catch(e){
		console.error(e);throw(e);
	}
}
ClientStorage.prototype.toString=function(){
    return JSON.stringify(this.data);
};
ClientStorage.prototype.toJson=function(){
    return this.data;
};
//Keys 	(...interface{}) []interface{}
ClientStorage.prototype.Keys=function(){return Object.keys(this.data[k]);};
//Values 	(...interface{}) []interface{}
ClientStorage.prototype.Values=function(k){return Object.values(this.data[k]);};
//IsMap 	(...interface{}) bool
ClientStorage.prototype.IsMap=function(k){return typeof(this.data[k])!="object"&&Array.isArray(this.data[k]);};
//Exists 	(...interface{}) bool
ClientStorage.prototype.Exists=function(k){return typeof(this.data[k])!="undefined"};
//Find 	(...interface{}) interface{}
ClientStorage.prototype.Find=function(k){return this.data[k]};
//Put 	(interface{}, ...interface{}) bool
ClientStorage.prototype.Put=function(k,v){this.data[k]=v;this.commit();};
//Remove 	(...interface{})
ClientStorage.prototype.Remove=function(k){delete this.data[k];this.commit();};
//Fprint 	(io.Writer, ...interface{}) error
ClientStorage.prototype.Fprint=function(){throw("EIMPL");};
//String 	(...interface{}) string
ClientStorage.prototype.String=function(){return JSON.stringify(this.data);};
//Focus 	(...interface{}) bool
ClientStorage.prototype.Focus=function(k){this.cursor=this.data[k];};
//Reset 	(...interface{}) bool
ClientStorage.prototype.Reset=function(){this.cursor=this.data;this.commit();};
//Clear 	(...interface{}) bool
ClientStorage.prototype.Clear=function(){this.data={};this.cursor=this.data;this.commit();};
//Close 	(...interface{}) bool
ClientStorage.prototype.Close=function(k){delete this.data[k];this.commit();};
//IsMapAt 	(interface{}, ...interface{}) bool
ClientStorage.prototype.IsMapAt=function(){return typeof(this.data[k])=="object"&&!Array.isArray(this.data[k]);};
//ExistsAt 	(interface{}, ...interface{}) bool
ClientStorage.prototype.ExistsAt=function(k,i){return typeof(this.data[k])=="object"&&!Array.isArray(this.data[k])&&this.data[k].length>i;};
//Push 	(interface{}, ...interface{}) int
ClientStorage.prototype.Push=function(k,v){this.data[k].push(v);this.commit();};
//Pop 	(interface{}, ...interface{}) interface{}
ClientStorage.prototype.Pop=function(k){this.data[k].pop();this.commit();};
//Shift 	(interface{}, ...interface{}) int
ClientStorage.prototype.Shift=function(k){this.data[k].shift(Object.values(arguments).splice(1));this.commit();};
//Unshift 	(interface{}, ...interface{}) interface{}
ClientStorage.prototype.Unshift=function(k){this.data[k].unshift(Object.values(arguments).splice(1));this.commit();};
//At 	(interface{}, ...interface{}) interface{}
ClientStorage.prototype.At=function(k,i){return this.data[k][i];};
//FocusAt 	(interface{}, ...interface{}) bool
ClientStorage.prototype.FocusAt=function(i){this.cursor=this.data[k];};
//ClearAt 	(interface{}, ...interface{}) bool
ClientStorage.prototype.ClearAt=function(k,i){this.data[k].splice(i,1);this.commit();};
//CloseAt 	(interface{}, ...interface{}) bool
ClientStorage.prototype.CloseAt=function(k,i){delete this.data[k];this.commit();};
//--------------------------------------------------------------------------------
var ServerStorage=function(){
	if(getEnv()!="SERVER")throw("EENV");
	this.cursur=null;
	Storage.call(this/*,args*/);
};
ServerStorage.prototype=Object.create(Storage.prototype);
ServerStorage.prototype.toJson=function(){
	if(this.cursor==null)throw("ECURSOR");
	return JSON.parse(this.cursor.String());
};
ServerStorage.prototype.load=function(){
	try{
		if(caching.Find(this.k)==null){
			this.isnew=true;
			caching.Put(this.k,{});
		}
		this.cursor=caching.Find(this.k);
		if(this.cursor==null)throw("ECURSOR");
	}catch(e){throw(e);}
}
ServerStorage.prototype.commit=function(options){};
//Keys 	(...interface{}) []interface{}
ServerStorage.prototype.Keys=function(){return this.cursor.Keys.apply(this,arguments);};
//Values 	(...interface{}) []interface{}
ServerStorage.prototype.Values=function(){return this.cursor.Keys.apply(this,arguments);};
//IsMap 	(...interface{}) bool
ServerStorage.prototype.IsMap=function(){return this.cursor.IsMap.apply(this,arguments);};
//Exists 	(...interface{}) bool
ServerStorage.prototype.Exists=function(){return this.cursor.Exists.apply(this,arguments);};
//Find 	(...interface{}) interface{}
ServerStorage.prototype.Find=function(){return this.cursor.Find.apply(this,arguments);};
//Put 	(interface{}, ...interface{}) bool
ServerStorage.prototype.Put=function(){return this.cursor.Put.apply(this,arguments);};
//Remove 	(...interface{})
ServerStorage.prototype.Remove=function(){return this.cursor.Remove.apply(this,arguments);};
//Fprint 	(io.Writer, ...interface{}) error
ServerStorage.prototype.Fprint=function(){return this.cursor.Fprint.apply(this,arguments);};
//String 	(...interface{}) string
ServerStorage.prototype.String=function(){return this.cursor.String.apply(this,arguments);};
//Focus 	(...interface{}) bool
ServerStorage.prototype.Focus=function(){return this.cursor.Focus.apply(this,arguments);};
//Reset 	(...interface{}) bool
ServerStorage.prototype.Reset=function(){return this.cursor.Reset.apply(this,arguments);};
//Clear 	(...interface{}) bool
ServerStorage.prototype.Clear=function(){return this.cursor.Clear.apply(this,arguments);};
//Close 	(...interface{}) bool
ServerStorage.prototype.Close=function(){return this.cursor.Close.apply(this,arguments);};
//IsMapAt 	(interface{}, ...interface{}) bool
ServerStorage.prototype.IsMapAt=function(){return this.cursor.IsMapAt.apply(this,arguments);};
//ExistsAt 	(interface{}, ...interface{}) bool
ServerStorage.prototype.ExistsAt=function(){return this.cursor.ExistsAt.apply(this,arguments);};
//Push 	(interface{}, ...interface{}) int
ServerStorage.prototype.Push=function(){return this.cursor.Push.apply(this,arguments);};
//Pop 	(interface{}, ...interface{}) interface{}
ServerStorage.prototype.Pop=function(){return this.cursor.Pop.apply(this,arguments);};
//Shift 	(interface{}, ...interface{}) int
ServerStorage.prototype.Shift=function(){return this.cursor.Shift.apply(this,arguments);};
//Unshift 	(interface{}, ...interface{}) interface{}
ServerStorage.prototype.Unshift=function(){return this.cursor.Unshift.apply(this,arguments);};
//At 	(interface{}, ...interface{}) interface{}
ServerStorage.prototype.At=function(){return this.cursor.At.apply(this,arguments);};
//FocusAt 	(interface{}, ...interface{}) bool
ServerStorage.prototype.FocusAt=function(){return this.cursor.FocusAt.apply(this,arguments);};
//ClearAt 	(interface{}, ...interface{}) bool
ServerStorage.prototype.ClearAt=function(){return this.cursor.ClearAt.apply(this,arguments);};
//CloseAt 	(interface{}, ...interface{}) bool
ServerStorage.prototype.CloseAt=function(){return this.cursor.CloseAt.apply(this,arguments);};
//--------------------------------------------------------------------------------
storage={
	getEnv:getEnv,
	LogFactory:LogFactory,
	AbstractLogger:AbstractLogger,
	ClientLogger:ClientLogger,
	ServerLogger:ServerLogger,
	AbstractStorageFactory:AbstractStorageFactory,
	StorageFactory:StorageFactory,
	AbstractStorage:AbstractStorage,
	Storage:Storage,
	ClientStorage:ClientStorage,
	ServerStorage:ServerStorage
};
