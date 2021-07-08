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
WGET_TGT=http://localhost:8083/
curl -X GET "$URL?cmd=wget&url="$WGET_TGT"&out=/downloads&recursive=true&debug=true" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"wget","url":"'$WGET_TGT'","recursive":true,"out":"./downloads","debug":true}' "$URL" --output -

#alternate invocations
#curl -X GET "$URL?cmd=wget&url=...&out=..." --output -
#curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>wget</cmd><url>http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src</url><recursive>true</recursive><out>./downloads</out></api>' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"wget","url":"http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src","recursive":true,"out":"-"}' "$URL" --output -
#curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>wget</cmd><url>http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src</url><recursive>true</recursive><out>-</out></api>' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"wget","recursive":true,"url":"http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src","recursive":true,"out":"./downloads"}' "$URL" --output -
#curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>wget</cmd><recursive>true</recursive><url>http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src</url><out>./downloads</out></api>' "$URL" --output -
