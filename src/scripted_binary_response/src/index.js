<@
	try{
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
		//--------------------------------------------------------------------------------
		function test0(){
			var t0=new Date();
			var pre=[0x42,0x4D,0x4C,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x1A,0x00,0x00,0x00,0x0C,0x00,0x00,0x00];
			var w=512;
			var h=512;
			var hdr=[0x01,0x00,0x18,0x00];
			var dat=[];
			for(var x=0;x<w;x++){
				for(var y=0;y<h;y++){
					dat.push(Math.floor(255*(y/h)));
					dat.push(Math.floor(255*(x/w)));
					dat.push(Math.floor(255-255*(y/h)));
				}
			}
			var t1=new Date();
			request.Response().SetHeader("Content-Type","image/bmp");
			request.Response().SetHeader("X-Duration",(t1-t0)+" ms");
			binwrite(pre);
			binwrite(int2byte(w));
			binwrite(int2byte(h));
			binwrite(hdr);
			binwrite(dat);
		}
		//--------------------------------------------------------------------------------
		function test1(){
			var t0=new Date();
			var pre=[0x42,0x4D,0x4C,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x1A,0x00,0x00,0x00,0x0C,0x00,0x00,0x00];
			var w=512;
			var h=512;
			var hdr=[0x01,0x00,0x18,0x00];
			var dat=new Array(w*h*3,0x00);
			var idx=0;
			for(var x=0;x<w;x++){
				for(var y=0;y<h;y++){
					dat[idx++]=(Math.floor(255*(y/h)));
					dat[idx++]=(Math.floor(255*(x/w)));
					dat[idx++]=(Math.floor(255-255*(y/h)));
				}
			}
			var t1=new Date();
			request.Response().SetHeader("Content-Type","image/bmp");
			request.Response().SetHeader("X-Duration",(t1-t0)+" ms");
			binwrite(pre);
			binwrite(int2byte(w));
			binwrite(int2byte(h));
			binwrite(hdr);
			var bufsz=256;
			for(var offset=0;offset<idx;offset+=bufsz)
				binwrite(dat.slice(offset,offset+bufsz));

		}
		//--------------------------------------------------------------------------------
		function test2(){
			var t0=new Date();
			var pre=[0x42,0x4D,0x4C,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x1A,0x00,0x00,0x00,0x0C,0x00,0x00,0x00];
			var w=512*2;
			var h=512;
			var hdr=[0x01,0x00,0x18,0x00];
			var dat=new Array(w*h*3).fill(0x00);
			function set(x,y,r,g,b){
				var o=x*3+y*w*3;
				dat[o+0]=b;
				dat[o+1]=g;
				dat[o+2]=r;
			}
			function get(x,y){
				var o=x*3+y*w*3;
				return[
					dat[o+2],
					dat[o+1],
					dat[o+0]
				];
			}
			function blur(ksz){
				ksz=typeof(ksz)=="number"?ksz:4;
				var idx=0;
				for(var x=0;x<w;x++){
					for(var y=0;y<h;y++){
						var avg=[0,0,0];
						for(var i=0;i<ksz;i++){
							for(var j=0;j<ksz;j++){
								var o=get(x+i,y+j);
								avg[0]+=o[0];
								avg[1]+=o[1];
								avg[2]+=o[2];
							}
						}
						avg[0]/=ksz*ksz;
						avg[1]/=ksz*ksz;
						avg[2]/=ksz*ksz;
						set(x,y,Math.min(avg[0],0xFF),Math.min(avg[1],0xff),Math.min(avg[2],0xff));
					}
				}

			}
			function mul(v){
				var idx=0;
				for(var x=0;x<w;x++){
					for(var y=0;y<h;y++){
						var o=get(x,y);
						o[0]*=v;
						o[1]*=v;
						o[2]*=v;
						set(x,y,o[0],o[1],o[2]);		
					}
				}
			}
			function pull_up(){
				var idx=0;
				for(var x=0;x<w;x++){
					for(var y=0;y<h;y++){
						var o=get(x,y);
						var f0=o[0]/255;
						var f1=o[1]/255;
						var f2=o[2]/255;
						f0=1-f0;
						f1=1-f1;
						f2=1-f2;
						f0=f0*f0;
						f1=f1*f1;
						f2=f2*f2;
						f0=1-f0;
						f1=1-f1;
						f2=1-f2;
						o[0]=f0*255;
						o[1]=f1*255;
						o[2]=f2*255;
						set(
							x,y,
							Math.min(o[0],0xff),
							Math.min(o[1],0xff),
							Math.min(o[2],0xff)
						);
					}
				}
			}
			function grid(sz,r,g,b){
				sz=typeof(sz)=="number"?sz:8;
				r=typeof(r)=="number"?r:0xff;
				g=typeof(g)=="number"?g:0xff;
				b=typeof(b)=="number"?b:0xff;
				for(var y=0;y<h;y+=h/sz){
					for(var x=0;x<w;x++){
						set(x,y,r,g,b);
					}
				}
				for(var y=0;y<h;y++){
					for(var x=0;x<w;x+=w/sz){
						set(x,y,r,g,b);
					}
				}

			}
			function bg0(){
				for(var x=0;x<w;x++){
					for(var y=0;y<h;y++){
						set(x,y,
							Math.floor(255*(y/h))/4,
							Math.floor(255*(x/w))/4,
							Math.floor(255-255*(y/h))/4
						);
					}
				}
			}
			function bg1(){
				for(var x=0;x<w;x++){
					for(var y=0;y<h;y++){
						var v=
							(0.5+0.5*Math.sin(2*Math.PI*y/h))*
							(0.5+0.5*Math.cos(2*Math.PI*x/w))
						;
						v=1-v;
						v*=0.2;
						set(x,y,
							Math.floor(255*(0.12*v)),
							Math.floor(255*(0.25*v)),
							Math.floor(255*(0.80*v))
						);
					}
				}
			}

			function stars(n,maxsz){
				n=typeof(n)=="number"?n:128;
				maxsz=typeof(maxsz)=="number"?maxsz:4;
				for(var i=0;i<n;i++){
					var pw=Math.floor(Math.random()*maxsz);
					var ph=Math.floor(Math.random()*maxsz);
					var x=Math.floor(Math.random()*w);
					var y=Math.floor(Math.random()*h);
					for(var j=0;j<pw;j++){
						for(var k=0;k<ph;k++){
							var v=Math.floor(Math.random()*0xFF)
							set(x+j,y+k,v,v,v);
						}
					}
				}
			}
			bg1();
			stars(512,3);
			stars(512,4);
			stars(512,2);
			stars(512,2);
			grid(32,0x00,0x00,0x33);
			grid(8,0x11,0x11,0x88);
			pull_up();
			var t1=new Date();
			request.Response().SetHeader("Content-Type","image/bmp");
			request.Response().SetHeader("X-Duration",(t1-t0)+" ms");
			binwrite(pre);
			binwrite(int2byte(w));
			binwrite(int2byte(h));
			binwrite(hdr);
			var bufsz=256;
			var nel=w*h*3;
			for(var offset=0;offset<nel;offset+=bufsz)
				binwrite(dat.slice(offset,offset+bufsz));

		}
		//--------------------------------------------------------------------------------
		//tests
		//--------------------------------------------------------------------------------
		test0();
		//test1();
		//test2();
		//--------------------------------------------------------------------------------
	}catch(e){
		request.Response().SetHeader("Content-Type","application/json");
		print(JSON.stringify({"error":e.toString()}));
	}
@>
