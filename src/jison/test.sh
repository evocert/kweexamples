#!/bin/bash
PROTOCOL=http
HOST=skullquake.dedicated.co.za
PORT=80
HOST=localhost
PORT=8081
ENDPOINT=/kweexamples/src/jison/api/
URL=$PROTOCOL://$HOST:$PORT$ENDPOINT
#--------------------------------------------------------------------------------
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
#--------------------------------------------------------------------------------
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
