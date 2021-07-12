define([
	"module",
	"../lib/idutils"
],function(
	module,
	idutils
){
	//init
	var K="log";
	if(caching.Find(K)==null)caching.Put(K,[[]]);
	//api
	function api(options){
		var t0=new Date();
		switch(options.action){
			case"create_test_data":
				var ret={"status":"OK"};
				for(var i=0;i<10000;i++){
					caching.Push(K,[{'ts':i,"msg":"test_"+idutils.uuidv4()}]);
					caching.Reset();
				}
				/*
				*/
				/*
				var cursor=caching.Find(K);
				for(var i=0;i<cursor.length;i++){
					var result=JSON.parse(cursor[i].String())
				}
				*/
				if(options.debug==true)ret.debug={options:options};
				if(options.debug==true)ret.debug.duration=(new Date()-t0)+" ms";
				return ret;
				break;
			case"create":
				caching.Push(K,[{'ts':new Date().getTime(),"msg":options.msg}]);
				var ret={"status":"OK"};
				if(options.debug==true)ret.debug={options:options};
				if(options.debug==true)ret.debug.duration=(new Date()-t0)+" ms";
				return ret;
				break;
			case"query":
				options.limit=typeof(options.limit)=="undefined"?10:options.limit;
				if(typeof(options.limit)!="number")throw("ETLIMIT");
				if(options.limit<0)throw("EVLIMIT");
				options.offset=typeof(options.offset)=="undefined"?0:options.offset;
				if(typeof(options.offset)!="number")throw("ETOFFSET");
				if(options.offset<0)throw("EVOFFSET");
				options.sort=typeof(options.sort)=="undefined"?"DESC":options.sort;
				if(typeof(options.sort)!="string")throw("ETSORT");
				if(typeof(options.query)=="undefined")options.query="";
				if(typeof(options.query)=="string")options.query=options.query.toString();
				if(options.sort!="ASC"&&options.sort!="DESC")throw("EVSORT");
				options.trim=typeof(options.trim)!="boolean"?false:options.trim;
				options.trimlength=typeof(options.trimlength)=="number"?options.trimlength:80;
				if(options.trimlength<0)throw("EVTRIM");
				var cursor=caching.Find(K);
				var ctime=(new Date())-t0;
				var buf=[];
				var idx_start=0;
				var idx_inc=1;
				var nres=0;
				switch(options.sort){
					case"ASC":
						idx_start=options.offset;
						idx_inc=1;
						break;
					case"DESC":
						idx_start=(cursor.length-options.offset-1);
						idx_inc=-1;
						break;
					default:
						throw("EVSORT");
						break;
				}
				for(var i=idx_start;(idx_inc>0)?(i<cursor.length):(i>=0);i+=idx_inc){
					if(nres>options.limit)break;
					var result=JSON.parse(cursor[i].String())
					result.id=i;
					var relevant=false;
					if(options.query.length==0){
						relevant=true;
					}else{
						Object.keys(result).forEach(function(k){
							if(result[k].toString().indexOf(options.query)>=0)relevant=true;
						}.bind(this));
					}
					if(relevant){
						if(options.trim==true)Object.keys(result).forEach(function(k){//trim
							if(typeof(result[k])=="string"&&result[k].length>options.trimlength)result[k]=result[k].substring(0,options.trimlength);
						}.bind(this));
						buf.push(result);
						nres++;
					}

				}
				var ret={result:buf};
				if(options.debug==true)ret.debug={options:options};
				if(options.debug==true)ret.debug.duration=(new Date()-t0)+" ms";
				if(options.debug==true)ret.debug.ctime=ctime+" ms";
				if(options.debug==true)ret.debug.total_rows=cursor.length;
				ret.meta={};
				ret.meta={total_rows:cursor.length};
				return ret;
				break;
			case"remove":
				var cursor=caching.Find(K);
				if(typeof(options.id)!="number")throw("ETID");
				if(options.id<0)throw("EVID");
				if(options.id>cursor.length)throw("EVID");
				try{
					//val[options.id].Remove();
					//val[options.id].Remove();
					//val.slice(1)
					//caching.Put(K,val);//Remove(0,1));
					//val.slice(8);
					return{"status":"stub"};//typeof(val.Slice)};
				}catch(e){throw(e);}
				break;
			case"clear":
				caching.Put(K,[[]]);
				return{"status":"OK"};
				break;
			default:
				return{"error":"invalid action"};
				break;
		};
	};
	module.exports=api;
});
