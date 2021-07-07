#!/bin/bash
HOST=skullquake.dedicated.co.za
PORT=80
PROTOCOL=http
HOST=localhost
PORT=8081
ENDPOINT=/kweexamples/src/download_file/api/
URL=$PROTOCOL://$HOST:$PORT$ENDPOINT
#curl -X GET "$URL?cmd=wget&url=...&out=..." --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"wget","url":"http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src","out":"./a.dat"}' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>wget</cmd><url>http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src</url><out>./a.dat</out></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"wget","recursive":true,"url":"http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src","out":"./a.dat"}' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>wget</cmd><recursive>true</recursive><url>http://skullquake.dedicated.co.za/kweexamples/src/scripted_binary_response/src</url><out>./a.dat</out></api>' "$URL" --output -
