<@
try{
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
}catch(e){
	request.ResponseHeader().Set("Content-Type","text/plain");
	println(e.toString());
}
@>
