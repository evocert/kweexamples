define(["module","./request","./idutils"],function(module,r,idutils){
	if(typeof(r.headers['X-Req-Token'])=="undefined")throw("ETOK");
	if(r.headers['X-Req-Token']!=42)throw("EAUTH");
	request.ResponseHeader().Set("X-Req-ID",idutils.uuidv4());
});
