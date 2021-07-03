<@
try{
	function test_read(){
		//--------------------------------------------------------------------------------
		//set up command
		//--------------------------------------------------------------------------------
		var cmd=newcommand(
			"ls",
			[
				"-l",
				"-r",
				"-t"
			]
		);
		cmd.SetReadTimeout(4096);

		//--------------------------------------------------------------------------------
		//set response mime type
		//--------------------------------------------------------------------------------
		request.ResponseHeader().Set("Content-Type","text/plain");

		//--------------------------------------------------------------------------------
		//obtaining/writing output
		//--------------------------------------------------------------------------------

		// -- method 0
		print(cmd);

		// -- method 1
		//var lidx=0;
		//for(var ln;ln=cmd.Readln();ln!=null,lidx++)
		//println(lidx+":"+ln);

		// -- method 2
		//var output=cmd.ReadAll();
		//print(output);

		// -- method 3
		//var buf=caching.NewBuffer(8)
		//incprint(buf);
		//	print(cmd);
		//decprint();
		//var output=buf.String();
		//print(output);

		// -- method 4
		//var buf=caching.NewBuffer(8)
		//incprint(buf);
		//	print(cmd);
		//decprint();
		//print(buf);

		//--------------------------------------------------------------------------------
		//close command
		//--------------------------------------------------------------------------------
		cmd.Close();
	}
	function test_write(){
		//--------------------------------------------------------------------------------
		//set up command
		//--------------------------------------------------------------------------------
		var cmd=newcommand(
			"bash",
			[
				"-c",
				`
#!/bin/bash
read usr
read pas
date
echo $usr
echo $pas
				`
			]
		);
		cmd.SetReadTimeout(0);
		//--------------------------------------------------------------------------------
		//set up write/read loop
		//--------------------------------------------------------------------------------
		var lines="";
		cmd.Println("john\ndoe\n");
		while(lines.length==0){
			lines=cmd.ReadAll();
			if(lines.length>0)break;
		}
		//--------------------------------------------------------------------------------
		//print output
		//--------------------------------------------------------------------------------
		print(lines);
		//--------------------------------------------------------------------------------
		//close command
		//--------------------------------------------------------------------------------
		cmd.Close();
	}
	test_write();
	//test_read();
}catch(e){
	request.ResponseHeader().Set("Content-Type","text/plain");
	println(e.toString());
}
@>
