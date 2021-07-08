<@
try{
	var a=webing.Send(
		"http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src"
	);
	_fsutils.SET("./a.dat",a);
	//print(a);
}catch(e){
	println(e.toString());
}
@>
