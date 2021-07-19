#!/bin/bash
PROTOCOL=http
HOST=skullquake.dedicated.co.za
PORT=80
HOST=localhost
PORT=8081
ENDPOINT=/kweexamples/src/graphing/api/
OUTFMT=json
URL=$PROTOCOL://$HOST:$PORT$ENDPOINT
#--------------------------------------------------------------------------------
#bombardier  -c 4 -m POST -H "Content-Type: application/json" -b '{"cmd":"tree","outfmt":"'$OUTFMT'"}' "$URL"
bombardier  -m POST -H "Content-Type: application/json" -b '{"cmd":"tree","outfmt":"'$OUTFMT'"}' "$URL"
