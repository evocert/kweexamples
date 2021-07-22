define([
	"module",
	"config",
	"lib/cryptojs/3.1.9/crypto-js.js"
],function(
	module,
	config,
	CryptoJS
){
	module.exports=function(options){
		var k=module.id;
		var v;
		if(caching.Find(k)==null)caching.Put(k,0);
		v=caching.Find(k);
		var r={val:v};
		try{
			var ct=CryptoJS.AES.encrypt(JSON.stringify(r),config.key).toString();
			var bytes=CryptoJS.AES.decrypt(ct,config.key);
			request.Response().SetHeader("Content-Type","text/plain");
			print(ct);
			//binwrite(bytes.words);
		}catch(e){
			request.Response().SetHeader("Content-Type","application/kwecrypt");
			print(JSON.stringify({"error":e.toString()}));
		}
		v++;
		caching.Put(k,v);
	};
});
