(function(){$(document).ready(function(){
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
		function test(idx){
			if(idx<0)return;
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
						test(idx-1);
					}catch(e){
						log(e.toString());
					}
				}.bind(this),
				error:function(e){
					alert(JSON.stringify(r));
				}.bind(this)
			});
		}
		test(8);
	});
})})();
