<@
try{
	var a=webing.Send(
		"http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src"
	);
	//print(a);
	_fsutils.SET("./a.dat",a);
}catch(e){
	println(e.toString());
}
@>
