`Jison` demonstration. You can use `Jison` to create DSLs.

The relevant file to look at is `./api/cmd/jison.js`. This handler expects an optional argument `prg` for the source code of a simple calculator program. Query parameter, JSON, and XML api may be used to invoke the test, for example

```
http://localhost:8081/kweexamples/src/jison/api/?cmd=jison&prg=%221/2%22
```

The JSON api may be used as follows:
```
curl\
	-X POST\
	-H "Content-Type: application/json"\
	"$URL"\
	--output -\
	--data-binary @- << EOF
{
	"cmd":"jison",
	"prg":"1+2\\n3-4\\n5*6\\n7*8",
	"outfmt":"json"
}
EOF
```

An array of lines may also be provided

```
curl\
	-X POST\
	-H "Content-Type: application/json"\
	"$URL"\
	--output -\
	--data-binary @- << EOF
{
	"cmd":"jison",
	"prg":[
		"1+2-3*4/5",
		"2+3-4*5/1",
		"3+4-5*1/2",
		"4+5-1*2/3"
	],
	"outfmt":"json"
}
EOF
```

The handler will respond with details about the program as well as output. The source for the calculator as used by `Jison` is located at `./api/src/calc.l`

Live example available <a href="http://skullquake.dedicated.co.za/kweexamples/src/jison/api/?cmd=jison" target="_blank">here</a>
