(function(){
	try{
		var sf=new StorageFactory();
		var s=sf.create();
		//s.clear();
		s.init("a",Math.random());
		s.init("b",[1,2,3,4]);
		s.set("c",Math.random());
		return s.toJson();
	}catch(e){
		return e.toString()
	}
})();
