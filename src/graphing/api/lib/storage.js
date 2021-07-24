define(["module"],function(module){
	//--------------------------------------------------------------------------------
	//server test:  http://localhost:8081/kweexamples/src/graphing/api/?cmd=data
	//browser test: http://localhost:8081/kweexamples/src/graphing/
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
	AbstractStorageFactory.prototype.create=function(){
		throw("EABSTRACT");
	};
	//--------------------------------------------------------------------------------
	var StorageFactory=function(){};
	var StorageFactory=function(options){
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
	Storage.prototype.set=function(k,v){
		throw("EABSTRACT");
	}
	Storage.prototype.get=function(k){
		throw("EABSTRACT");
	}
	Storage.prototype.append=function(k,v){
		throw("EABSTRACT");
	}
	Storage.prototype.pop=function(k,v){
		throw("EABSTRACT");
	}
	Storage.prototype.isNew=function(){
		return this.isnew;
	};
	Storage.prototype.clear=function(){
		this.setdata({});
		this.commit();
	};
	Storage.prototype.toString=function(){
		throw("EABSTRACT");
	};
	Storage.prototype.toJson=function(){
		return JSON.parse(this.toString());
	};
	//--------------------------------------------------------------------------------
	var ClientStorage=function(options){
		if(getEnv()!="CLIENT")throw("EENV");
                Storage.call(this,options);///*,args*/);
	};
	ClientStorage.prototype=Object.create(Storage.prototype);
	ClientStorage.prototype.get=function(k){
		this.load();
		return this.data[k];
	}
	ClientStorage.prototype.set=function(k,v){
		this.data[k]=v;
		this.commit();
	}
	ClientStorage.prototype.append=function(k,v){
		if(Array.isArray(this.data[k])){
			this.data[k].push(v);
			this.commit();
		}else throw("ETYPE");
	}
	ClientStorage.prototype.pop=function(k){
		if(Array.isArray(this.data[k])){
			var ret=this.data[k].pop();
			this.commit();
			return ret;
		}else throw("ETYPE");
	}

	ClientStorage.prototype.toString=function(k,v){
		return localStorage.getItem(this.k);
	}
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
		this.cursur=null;
                Storage.call(this/*,args*/);
	};
	ServerStorage.prototype=Object.create(Storage.prototype);
	ServerStorage.prototype.get=function(k){
		if(this.cursor==null)throw("ECURSOR");
		//caching.Reset();
		if(caching.Find(this.k)==null){
			this.isnew=true;
			//caching.Put(this.k,{});
			this.cursor.Put(this.k,{});
		}
		return caching.Find(this.k,k);
	}
	ServerStorage.prototype.set=function(k,v){
		if(this.cursor==null)throw("ECURSOR");
		this.cursor.Put(k,Array.isArray(v)?[v]:v);
	}
	ServerStorage.prototype.append=function(k,v){
		if(this.cursor==null)throw("ECURSOR");
		this.cursor.Push(k,v);

	};
	ServerStorage.prototype.pop=function(k){
		if(this.cursor==null)throw("ECURSOR");
		//return typeof(this.cursor.Remove());//Find(this.k,k);//.Pop();
		var ret=this.cursor.Pop(k);//does not remove...
		return ret;
	};
	ServerStorage.prototype.clear=function(){
		caching.Remove(this.k);
		this.load();
	};
	ServerStorage.prototype.toString=function(){
		if(this.cursor==null)throw("ECURSOR");
		return this.cursor.String();
	};
	ServerStorage.prototype.toJson=function(){
		if(this.cursor==null)throw("ECURSOR");
		caching.Reset();
		return JSON.parse(caching.Find(this.k).String());
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
	ServerStorage.prototype.commit=function(options){
	};
	//--------------------------------------------------------------------------------
	function test(){
		var sf=new StorageFactory();
		var s=sf.create();
		a=s.init("a",0);
		b=s.init("b",1);
		c=s.init("c",2);
		c=s.init("d",[]);
		if(s.get("a")>5)s.set("d",[]);
		s.set("a",s.get("a")+1);
		s.set("b",s.get("b")+1);
		s.set("c",s.get("c")+1);
		s.append("d",s.get("d").length+1);
		logger.log(s.get("a"));
		logger.log(s.get("b"));
		logger.log(s.get("c"));
		logger.log(s.get("d"));
		logger.log(s.toString());
		logger.log(s.toJson());
		if(s.get("a")>10)s.clear();
		s.commit();
		return logger.flush();
	};
	//--------------------------------------------------------------------------------
	module.exports={
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
		ServerStorage:ServerStorage,
		test:test
	};
});
