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
#--------------------------------------------------------------------------------
curl\
	-X POST\
	-H "Content-Type: application/xml"\
	"$URL"\
	--output -\
	--data-binary @- << EOF
<?xml version="1.0" encoding="UTF-8"?>
<api>
	<cmd>
		jison
	</cmd>
	<prg>
		1+2-3*4/5
		2+3-4*5/1
		3+4-5*1/2
		4+5-1*2/3
	</prg>
	<outfmt>
		xml
	</outfmt>
</api>
EOF
#--------------------------------------------------------------------------------
#inline lex src
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
	"src":"/* description: Parses end executes mathematical expressions. */\n\n/* lexical grammar */\n%lex\n\n%%\ns+                   /* skip whitespace */\n[0-9]+(\".\"[0-9]+)?\b  return 'NUMBER';\n\"*\"                   return '*';\n\"/\"                   return '/';\n\"-\"                   return '-';\n\"+\"                   return '+';\n\"^\"                   return '^';\n\"(\"                   return '(';\n\")\"                   return ')';\n\"PI\"                  return 'PI';\n\"E\"                   return 'E';\n<<EOF>>               return 'EOF';\n\n/lex\n\n/* operator associations and precedence */\n\n%left '+' '-'\n%left '*' '/'\n%left '^'\n%left UMINUS\n\n%start expressions\n\n%% /* language grammar */\n\nexpressions\n    : e EOF\n        {/*print($1);*/ return $1;}\n    ;\n\ne\n    : e '+' e\n        {$$ = $1+$3;}\n    | e '-' e\n        {$$ = $1-$3;}\n    | e '*' e\n        {$$ = $1*$3;}\n    | e '/' e\n        {$$ = $1/$3;}\n    | e '^' e\n        {$$ = Math.pow($1, $3);}\n    | '-' e %prec UMINUS\n        {$$ = -$2;}\n    | '(' e ')'\n        {$$ = $2;}\n    | NUMBER\n        {$$ = Number(yytext);}\n    | E\n        {$$ = Math.E;}\n    | PI\n        {$$ = Math.PI;}\n    ;\n",
	"outfmt":"json"
}
EOF
#--------------------------------------------------------------------------------
