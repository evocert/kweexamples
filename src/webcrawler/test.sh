#!/bin/bash
HOST=skullquake.dedicated.co.za
PORT=80
PROTOCOL=http
HOST=localhost
PORT=8081
ENDPOINT=/kweexamples/src/webcrawler/api/
URL=$PROTOCOL://$HOST:$PORT$ENDPOINT
WGET_TGT=https://gcc.gnu.org/releases.html
WGET_TGT=https://gcc.gnu.org/onlinedocs/
WGET_TGT=https://docs.qgis.org/2.14/pdf/
WGET_TGT=http://www.bigear.org/
WGET_TGT=http://localhost:3000/
WGET_DEBUG=true
WGET_RECURSIVE=true
WGET_OUTPUT=-
WGET_MAX_VISIT=1024
WGET_MAX_DEPTH=4
echo curl -X GET "$URL?cmd=wget&url="$WGET_TGT"&recursive="$WGET_RECURSIVE"&debug="$WGET_DEBUG"&maxvisit="$WGET_MAX_VISIT"&maxdepth="$WGET_MAX_DEPTH"&output="$WGET_OUTPUT"" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"wget","url":"'$WGET_TGT'","recursive":'$WGET_RECURSIVE',"maxdepth":'$WGET_MAX_DEPTH',"maxvisit":'$WGET_MAX_VISIT',"output":"'$WGET_OUTPUT'","debug":'$WGET_DEBUG'}' "$URL" --output -
#curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>wget</cmd><url>'$WGET_TGT'</url><recursive>'$WGET_RECURSIVE'</recursive><maxvisit>'$WGET_MAX_VISIT'</maxvisit><maxdepth>'$WGET_MAX_DEPTH'</maxdepth><debug>'$WGET_DEBUG'</debug><output>'$WGET_OUTPUT'</output></api>' "$URL" --output -
