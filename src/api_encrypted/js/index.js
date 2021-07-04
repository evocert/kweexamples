(function(){$(document).ready(function(){
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
	function log(val){
		$("#output").append($("<div/>").text(val));
	}
	$.ajax({
		url:"./api/",
		data:{
			"cmd":"getkey"
		},
		success:function(r){
			try{
				log("api/?cmd=getkey:"+JSON.stringify(r));
			}catch(e){
				log(e.toString());
			}
		}.bind(this),
		error:function(e){
			alert(JSON.stringify(r));
		}.bind(this)
	}).then(function(a){
		function test0(idx){
			if(idx<=0){test1(4);return;};
			$.ajax({
				url:"./api/",
				data:{
					"cmd":"acc"
				},
				success:function(r){
					try{
						log("api/?cmd=acc:"+r);
						var bytes=CryptoJS.AES.decrypt(r,a.key);
						var decryptedData=JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
						log("decrypted:"+JSON.stringify(decryptedData));
						test0(idx-1);
					}catch(e){
						log(e.toString());
					}
				}.bind(this),
				error:function(e){
					alert(JSON.stringify(r));
				}.bind(this)
			});
		}
		function test1(idx){//unencrypted hex
			if(idx<=0){test2(4);return;};
			$.ajax({
				url:"./api/",
				data:{
					"cmd":"bmp",
					"encrypt":false,
					"fmt":"hex",
					"w":64,
					"h":64,
				},
				success:function(r){
					try{
						log("api/?cmd=bmp&encrypt=false&fmt=hex:"+r.length+" bytes");
						var bytes=hexToBytes(r);
						var binary="";
						for (var i=0;i<bytes.length;i++)
							binary+=String.fromCharCode(bytes[i]);
						var base64=window.btoa(binary);
						var mime="image/bmp";
						var img=$("<img/>").attr({
							src:'data:'+mime+';base64,'+base64,
						})
						$(document.body).append(img);
						test1(idx-1);
					}catch(e){
						log(e.toString());
					}
				}.bind(this),
				error:function(e){
					alert(JSON.stringify(r));
				}.bind(this)
			});
		}
		function test2(idx){//encrypted hex
			//https://stackoverflow.com/questions/58190380/encrypt-a-byte-array-in-javascript-using-crypto-js-aes-ecb-algorithm
			if(idx<=0)return;
			$.ajax({
				url:"./api/",
				data:{
					"cmd":"bmp",
					"encrypt":true,
					"fmt":"hex",
					"w":64,
					"h":64,
				},
				success:function(r){
					try{
						log("api/?cmd=bmp&encrypt=true&fmt=hex:"+r.length+" bytes");
						var bytes=CryptoJS.AES.decrypt(r,a.key,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.ZeroPadding})
						var hex=CryptoJS.enc.Hex.stringify(bytes);
						var bytes=hexToBytes(hex);
						var binary="";
						for (var i=0;i<bytes.length;i++)
							binary+=String.fromCharCode(bytes[i]);
						var base64=window.btoa(binary);
						var mime="image/bmp";
						var img=$("<img/>").attr({
							src:'data:'+mime+';base64,'+base64,
						})
						$(document.body).append(img);
						test2(idx-1);
					}catch(e){
						log(e.toString());
					}
				}.bind(this),
				error:function(e){
					alert(JSON.stringify(r));
				}.bind(this)
			});
		}

		test0(4);

	});
})})();
