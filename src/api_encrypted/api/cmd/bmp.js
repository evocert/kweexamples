define([
	"module",
	"config",
	"lib/cryptojs/3.1.9/crypto-js.js"
],function(
	module,
	config,
	CryptoJS
){
	//--------------------------------------------------------------------------------
	//util
	//--------------------------------------------------------------------------------
	function int2byte(v){
		var buf=[];
		buf.push(v&(255));
		v=v>>8
		buf.push(v&(255));
		return buf;
	}
	function hexToBytes(hex) {
		for (var bytes = [], c = 0; c < hex.length; c += 2)
			bytes.push(parseInt(hex.substr(c, 2), 16));
		return bytes;
	}

	function bytesToHex(bytes) {
		for (var hex = [], i = 0; i < bytes.length; i++) {
			var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
			hex.push((current >>> 4).toString(16));
			hex.push((current & 0xF).toString(16));
		}
		return hex.join("");
	}
	//--------------------------------------------------------------------------------
	module.exports=function(options){
		options.encrypt=typeof(options.encrypt)=="boolean"?options.encrypt:true;
		options.fmt=typeof(options.fmt)=="string"?options.fmt:"bin";
		options.w=typeof(options.w)=="number"&&options.w>0?options.w:32;
		options.h=typeof(options.h)=="number"&&options.h>0?options.h:32;
		//--------------------------------------------------------------------------------
		function test0(){
			var t0=new Date();
			var pre=[0x42,0x4D,0x4C,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x1A,0x00,0x00,0x00,0x0C,0x00,0x00,0x00];
			var w=options.w;
			var h=options.h;
			var hdr=[0x01,0x00,0x18,0x00];
			var dat=[];
			for(var x=0;x<w;x++){
				for(var y=0;y<h;y++){
					dat.push(Math.floor(255*(y/h)));
					dat.push(Math.floor(255*(x/w)));
					dat.push(Math.floor(255-255*(y/h)));
				}
			}
			var outbuf=pre.concat(int2byte(w)).concat(int2byte(h)).concat(hdr).concat(dat);
			if(options.encrypt){
				//https://cryptojs.gitbook.io/docs/#encoders
				var hex=bytesToHex(outbuf)
				var hexwa=CryptoJS.enc.Hex.parse(hex);
				var ct=CryptoJS.AES.encrypt(hexwa,config.key,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.NoPadding});
				var ct=ct.toString();
				request.ResponseHeader().Set("Content-Type","text/plain");
				var t1=new Date();
				request.ResponseHeader().Set("X-Duration",(t1-t0)+" ms");
				print(ct);
			}else{
				switch(options.fmt){
					case"hex":
						outbuf=bytesToHex(outbuf);
						var t1=new Date();
						request.ResponseHeader().Set("Content-Type","text/plain");
						request.ResponseHeader().Set("X-Duration",(t1-t0)+" ms");
						binwrite(outbuf);
						break;
					case"bin":
					default:
						var t1=new Date();
						request.ResponseHeader().Set("Content-Type","image/bmp");
						request.ResponseHeader().Set("X-Duration",(t1-t0)+" ms");
						binwrite(outbuf);
						break;
				}
			}
		}
		test0();
	};
});
