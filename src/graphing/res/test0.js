(function(){
	try{
		var sf=new StorageFactory();
		var s=sf.create();
		s.init("a",0);
		s.init("b",[1,2,3,4]);
		return s.toJson();
	}catch(e){
		return e.toString()
	}
})();
