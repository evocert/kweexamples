This example illustrates using `D3` client side to render a treeview using data generated on the server.

```
https://stackoverflow.com/questions/20853485/d3-js-collapsible-tree-how-to-connect-different-parents-with-same-child
http://bl.ocks.org/mbostock/4339083
http://bl.ocks.org/mbostock/1093130
```
var a={
	"0":{
		//"name":"",
		//"description":"",
		//"value":"",
		//"properties":{},
		//"children":{
		"c":{
			"2":{
				"c":{
					"0":"0",//bref
				}
			},
			"3":{
				"c":{
					"0":"0",//bref
				}
			}
		}
		},
		"1":{
			"c":{
			"0":"0",//bref
			}
		}
	};
