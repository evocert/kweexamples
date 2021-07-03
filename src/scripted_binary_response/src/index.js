<@
	try{
		function int2byte(v){
			var buf=[];
			buf.push(v&(255));
			v=v>>8
			buf.push(v&(255));
			return buf;
		}
		var pre=[0x42,0x4D,0x4C,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x1A,0x00,0x00,0x00,0x0C,0x00,0x00,0x00];
		var w=256;
		var h=256;
		var hdr=[0x01,0x00,0x18,0x00];
		var dat=[];
		for(var x=0;x<w;x++){
			for(var y=0;y<h;y++){
				dat.push(Math.floor(255*(y/h)));
				dat.push(Math.floor(255*(x/w)));
				dat.push(Math.floor(255-255*(y/h)));
			}
		}
		request.ResponseHeader().Set("Content-Type","image/bmp");
		binwrite(pre);
		binwrite(int2byte(w));
		binwrite(int2byte(h));
		binwrite(hdr);
		binwrite(dat);
	}catch(e){
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify({"error":e.toString()}));
	}
@>
