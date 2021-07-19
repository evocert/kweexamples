define(["module"],function(module){
	//--------------------------------------------------------------------------------
	//todo: abstract object
	//      requirejs caching goja using caching
	//      requirejs caching browser using localstorage
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
	}
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
	var AbstractLogger=function(){};
	AbstractLogger.prototype.log=function(){
		throw("EABSTRACT");
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
	};
	//--------------------------------------------------------------------------------
	var ServerLogger=function(){};
	var ServerLogger=function(){
		AbstractLogger.call(this/*,args*/);
	};
	ServerLogger.prototype=Object.create(AbstractLogger.prototype);
	ServerLogger.prototype.log=function(){
		console.Log.apply(this,arguments);
	};
	//--------------------------------------------------------------------------------
	var logf=new LogFactory();
	var logger=logf.create();
	//--------------------------------------------------------------------------------
	var ObjectFactory=function(){};
	ObjectFactory.prototype.create=function(options){
		switch(getEnv()){
			case"SERVER":
				var obj=new ServerObject(options)
				return new Proxy(obj.data,obj);
				break;
			case"CLIENT":
				var obj=new ClientObject(options)
				return new Proxy(obj.data,obj);
				break;
			default:
				throw("EENV");
				break;
		}
	}
	//--------------------------------------------------------------------------------
	var AbstractObject=function(options){
		options=typeof(options)=="object"?options:{};
		this.data=typeof(options.data)=="undefined"?{}:options.data;
	};
	AbstractObject.prototype.log=function(){
		throw("EABSTRACT");
	};
	//--------------------------------------------------------------------------------
	var ClientObject=function(options){
		AbstractObject.call(this,options);
	};
	ClientObject.prototype=Object.create(AbstractObject.prototype);
	ClientObject.prototype.get=function(tgt,prp,rcv){
		logger.log("get");
		return tgt[prp];
	};
	ClientObject.prototype.set=function(tgt,prp,val){
		logger.log("set");
		tgt[prp]=val;
		return true;
	};
	ClientObject.prototype.deleteProperty=function(tgt,prp){
		logger.log("deleteProperty");
		delete tgt[prp];
		return true;
	};
	ClientObject.prototype.ownKeys=function(tgt){
		logger.log("ownKeys");
		return Object.keys(tgt);
	};
	ClientObject.prototype.getOwnPropertyDescriptor=function(tgt,prp){
		logger.log("getOwnPropertyDescriptor");
		return{
			enumerable:true,
			configurable:true
		}
	};
	ClientObject.prototype.toJSON=function(tgt){//serializer here???
		logger.log("toJSON");
		return JSON.stringify(tgt);
	};
	ClientObject.prototype.String=function(tgt){//serializer here???
		logger.log("toJSON");
		return JSON.stringify(tgt);
	};

	ClientObject.prototype.has=function(tgt,prp){//todo= implement on array members
		logger.log("has");
		return typeof(tgt[prp])!="undefined";
	};
	ClientObject.prototype.apply=function(tgt,targ,args){
		logger.log("apply");
		//stub
		return true
	};
	//--------------------------------------------------------------------------------
	var ServerObject=function(options){
		AbstractObject.call(this,options);
	};
	ServerObject.prototype=Object.create(AbstractObject.prototype);
	ServerObject.prototype.get=function(tgt,prp,rcv){
		logger.log("get");
		return typeof(tgt[prp])=="undefined"?null:tgt[prp];
	};
	ServerObject.prototype.set=function(tgt,prp,val){
		logger.log("set");
		tgt[prp]=val;
		return true;
	};
	ServerObject.prototype.deleteProperty=function(tgt,prp){
		logger.log("deleteProperty");
		delete tgt[prp];
		return true;
	};
	ServerObject.prototype.ownKeys=function(tgt){
		logger.log("ownKeys");
		return Object.keys(tgt);
	};
	ServerObject.prototype.getOwnPropertyDescriptor=function(tgt,prp){
		logger.log("getOwnPropertyDescriptor");
		return{
			enumerable:true,
			configurable:true
		}
	};
	ServerObject.prototype.toJSON=function(tgt){//serializer here???
		logger.log("toJSON");
		return JSON.stringify(tgt);
	};
	ServerObject.prototype.has=function(tgt,prp){//todo= implement on array members
		logger.log("has");
		return typeof(tgt[prp])!="undefined";
	};
	ServerObject.prototype.apply=function(tgt,targ,args){
		logger.log("apply");
		//stub
		return true
	};
	//--------------------------------------------------------------------------------
	var AbstractStorageFactory=function(){};
	AbstractStorageFactory.prototype.create=function(){
		throw("EABSTRACT");
	};
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
	AbstractStorage.prototype.init=function(k,v){
		throw("EABSTRACT");
	}
	AbstractStorage.prototype.set=function(k,v){
		throw("EABSTRACT");
	}
	AbstractStorage.prototype.get=function(k){
		throw("EABSTRACT");
	}
	AbstractStorage.prototype.isNew=function(){
		throw("EABSTRACT");
	};
	AbstractStorage.prototype.clear=function(){
		throw("EABSTRACT");
	};
	AbstractStorage.prototype.toString=function(){
		throw("EABSTRACT");
	};
	AbstractStorage.prototype.toJson=function(){
		throw("EABSTRACT");
	};
	//--------------------------------------------------------------------------------
	var Storage=function(){
                AbstractStorage.call(this/*,args*/);
		options=typeof(options)=="object"?options:{};
		this.k=typeof(options.k)=="string"?options.k:defaults.store.k;
		this.isnew=true;
		this.data={};
		this.cursor=null;
		this.load();
	};
	Storage.prototype=Object.create(AbstractStorage.prototype);
	Storage.prototype.setdata=function(data){
		var of=new ObjectFactory();
		this.data=of.create({data:data});
	}
	Storage.prototype.init=function(k,v){
		if(this.get(k)==null)this.set(k,v);
		return this.get(k);
	}
	Storage.prototype.set=function(k,v){
		this.data[k]=v;
	}
	Storage.prototype.get=function(k){
		return this.data[k];
	}
	Storage.prototype.isNew=function(){
		return this.isnew;
	};
	Storage.prototype.clear=function(){
		this.setdata({});
		this.commit();
	};
	Storage.prototype.toString=function(){
		return JSON.stringify(this.data);
	};
	Storage.prototype.toJson=function(){
		return this.data;
	};
	//--------------------------------------------------------------------------------
	var ClientStorage=function(){
		if(getEnv()!="CLIENT")throw("EENV");
                Storage.call(this/*,args*/);
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
		}catch(e){
			console.error(e);throw(e);
		}
	}
	//--------------------------------------------------------------------------------
	var ServerStorage=function(){
		if(getEnv()!="SERVER")throw("EENV");
                Storage.call(this/*,args*/);
	};
	ServerStorage.prototype=Object.create(Storage.prototype);
	ServerStorage.prototype.commit=function(options){
		logger.log("COM");
		logger.log(JSON.stringify(this.data));
		caching.Put(this.k,JSON.parse(JSON.stringify(this.data)));//??? compare with clientstorage impl
	};
	ServerStorage.prototype.load=function(){
		try{
			if(caching.Find(this.k)==null){
				this.isnew=true;
				caching.Put(this.k,{});
			}
			var cursor=caching.Find(this.k);
			this.setdata(JSON.parse(cursor.String()));
		}catch(e){throw(e);}
	}
	//--------------------------------------------------------------------------------
	var AbstractNodeFactory=function(){};
	AbstractNodeFactory.prototype.create=function(){
		throw("EABSTRACT");
	};
	//--------------------------------------------------------------------------------
	var NodeFactory=function(){};
	var NodeFactory=function(){
		AbstractNodeFactory.call(this/*,args*/);
	};
	NodeFactory.prototype=Object.create(AbstractNodeFactory.prototype);
	NodeFactory.prototype.create=function(options){
		switch(getEnv()){
			case"SERVER":
				return new ServerNode(options);
				break;
			case"CLIENT":
				return new ClientNode(options);
				break;
			default:
				throw("EENV");
				break;
		}
	};
	//--------------------------------------------------------------------------------
	var AbstractNode=function(){};
	AbstractNode.prototype.getChildren=function(options){
		throw("EABSTRACT");
	};
	AbstractNode.prototype.getParent=function(options){
		throw("EABSTRACT");
	};
	AbstractNode.prototype.getData=function(options){
		throw("EABSTRACT");
	};
	AbstractNode.prototype.setData=function(options){
		throw("EABSTRACT");
	};
	//--------------------------------------------------------------------------------
	var ClientNode=function(){
		if(getEnv()!="CLIENT")throw("EENV");
	};
	ClientNode.prototype=Object.create(AbstractNode.prototype);
	ClientNode.prototype.getChildren=function(options){
		throw("EIMPL");
	};
	ClientNode.prototype.getParent=function(options){
		throw("EIMPL");
	};
	ClientNode.prototype.getData=function(options){
		throw("EIMPL");
	};
	ClientNode.prototype.setData=function(options){
		throw("EIMPL");
	};
	//--------------------------------------------------------------------------------
	var ServerNode=function(){
		if(getEnv()!="SERVER")throw("EENV");
		AbstractNode.call(this/*,args*/);
	};
	ServerNode.prototype=Object.create(AbstractNode.prototype);
	ServerNode.prototype.getChildren=function(options){
		throw("EIMPL");
	};
	ServerNode.prototype.getParent=function(options){
		throw("EIMPL");
	};
	ServerNode.prototype.getData=function(options){
		throw("EIMPL");
	};
	ServerNode.prototype.setData=function(options){
		throw("EIMPL");
	};
	//--------------------------------------------------------------------------------
	var AbstractTreeFactory=function(){};
	AbstractTreeFactory.prototype.g=function(){
		throw("EIMPL");
	};
	//--------------------------------------------------------------------------------
	var TreeFactory=function(){};
	var TreeFactory=function(){
		AbstractTreeFactory.call(this/*,args*/);
	};
	TreeFactory.prototype=Object.create(AbstractTreeFactory.prototype);
	TreeFactory.prototype.g=function(options){
		switch(getEnv()){
			case"SERVER":
				return new ServerTree(options);
				break;
			case"CLIENT":
				return new ClientTree(options);
				break;
			default:
				throw("EENV");
				break;
		}
	};
	//--------------------------------------------------------------------------------
	var AbstractTree=function(){};
	AbstractTree.prototype.addChild=function(options){
		throw("EABSTRACT");
	};
	AbstractTree.prototype.reset=function(k){
		throw("EABSTRACT");
	};
	AbstractTree.prototype.getChild=function(k){
		throw("EABSTRACT");
	};
	AbstractTree.prototype.removeChild=function(options){
		throw("EABSTRACT");
	};
	AbstractTree.prototype.getChildren=function(){
		throw("EABSTRACT");
	};
	AbstractTree.prototype.toJson=function(){
		throw("EABSTRACT");
	};
	AbstractTree.prototype.data=function(){
		throw("EABSTRACT");
	};
	AbstractTree.prototype.test=function(){
		throw("EABSTRACT");
	};
	//--------------------------------------------------------------------------------
	var ClientTree=function(){
		if(getEnv()!="CLIENT")throw("EENV");
		AbstractTree.call(this/*,args*/);
		this.id=0;
		this.data={children:{}};
		this.cursor=this.data;
	};
	ClientTree.prototype=Object.create(AbstractTree.prototype);
	ClientTree.prototype.addChild=function(options){
		options=typeof(options)=="object"?options:{};
		var child={};
		Object.keys(child).forEach(function(k){child[k]=options[k]});
		child.children={};
		this.cursor.children[this.id]=child;
		this.cursor=child;
		var ret=this.id;
		this.id++;
		return ret;
	};
	ClientTree.prototype.reset=function(k){
		this.cursor=this.data;
	};
	ClientTree.prototype.getChild=function(k){
		return this.cursor.children[k];
	};
	ClientTree.prototype.removeChild=function(options){
	};
	ClientTree.prototype.getChildren=function(){
		return this.cursor.children;
	};
	ClientTree.prototype.toJson=function(){
		return JSON.stringify(this.data,0,2);
	};
	ClientTree.prototype.data=function(){
		return JSON.parse(this.toJson());
	};
	ClientTree.prototype.test=function(){
		this.addChild();
		this.addChild();
		this.addChild();
		return this.toJson();
	};
	//--------------------------------------------------------------------------------
	var ServerTree=function(){
		if(getEnv()!="SERVER")throw("EENV");
		AbstractTree.call(this/*,args*/);
		this.id=0;
		this.data={children:{}};
		this.cursor=this.data;
	};
	ServerTree.prototype=Object.create(AbstractTree.prototype);
	ServerTree.prototype.addChild=function(options){
		options=typeof(options)=="object"?options:{};
		var child={};
		Object.keys(child).forEach(function(k){child[k]=options[k]});
		child.children={};
		this.cursor.children[this.id]=child;
		this.cursor=child;
		var ret=this.id;
		this.id++;
		return ret;
	};
	ServerTree.prototype.reset=function(k){
		this.cursor=this.data;
	};
	ServerTree.prototype.getChild=function(k){
		return this.cursor.children[k];
	};
	ServerTree.prototype.removeChild=function(options){
	};
	ServerTree.prototype.getChildren=function(){
		return this.cursor.children;
	};
	ServerTree.prototype.toJson=function(){
		return JSON.stringify(this.data,0,2);
	};
	ServerTree.prototype.data=function(){
		return JSON.parse(this.toJson());
	};
	ServerTree.prototype.test=function(){
		this.addChild();
		this.addChild();
		this.addChild();
		return this.toJson();
	};
	//--------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------
	function Tree(){
		this.id=0;
		this.data={children:{}};
		this.cursor=this.data;
	};
	Tree.prototype.addChild=function(options){
		options=typeof(options)=="object"?options:{};
		var child={};
		Object.keys(child).forEach(function(k){child[k]=options[k]});
		child.children={};
		this.cursor.children[this.id]=child;
		this.cursor=child;
		var ret=this.id;
		this.id++;
		return ret;
	};
	Tree.prototype.reset=function(k){
		this.cursor=this.data;
	};
	Tree.prototype.getChild=function(k){
		return this.cursor.children[k];
	};
	Tree.prototype.removeChild=function(options){
	};
	Tree.prototype.getChildren=function(){
		return this.cursor.children;
	};
	Tree.prototype.toJson=function(){
		return JSON.stringify(this.data,0,2);
	};
	Tree.prototype.data=function(){
		return JSON.parse(this.toJson());
	};
	Tree.prototype.test=function(){
		//logger.log("test:start");
		{
			var af=new TreeFactory();
			var a=af.g();
			a.addChild();
		}
		{
			var sf=new StorageFactory();
			var s=sf.create();
			a=s.init("a",0);
			b=s.init("b",0);
			c=s.init("c",0);
			c=s.init("d",[]);
			s.data.a=s.data.a+1;
			s.data.b=s.data.a+1;
			s.data.c=s.data.a+1;
			if(s.data.d.length==0)s.data.d.push(0);
			s.data.d.push(s.data.d[s.data.d.length-1]+1);
			s.data.d=s.data.d.slice(-8);
			logger.log(s.toString());
			logger.log(s.toJson());
			s.commit();
		}
		{
			var nf=new NodeFactory();
			var n=nf.create();
			//n.get();
			//n.set();
		}
		if(false){
			var of=new ObjectFactory();
			var o=of.create();
			o.a=42;
			logger.log(o.a);
			logger.log(JSON.stringify(o));
		}
		logger.log("test:end");
		return this.toJson();
	};
	module.exports={
		Tree:Tree
	};
});