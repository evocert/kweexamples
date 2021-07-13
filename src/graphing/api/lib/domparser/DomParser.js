define(["module","./Dom"],function(module,Dom){
	function DomParser() {
	}

	DomParser.prototype.parseFromString = function (html) {
	  return new Dom(html);
	};

	module.exports = DomParser;
});
