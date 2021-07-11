#!/bin/bash
PROTOCOL=http
HOST=localhost
ENDPOINT=/kweexamples/src/cache_entry_browser/api/
PORT=8081
URL=$PROTOCOL://$HOST:$PORT$ENDPOINT
#create test data
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"create_test_data","debug":true}' "$URL" --output -
#clear
#echo curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"clear"}' "$URL" --output -
#select
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"list"}' "$URL" --output -
#create
#for I in `seq 0 1 512`;do
#	curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"create","msg":"test_'$I'","debug":true}' "$URL" --output -
#done
#select
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"list"}' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"list","limit":2}' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"list","limit":-2}' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"list","limit":"foo"}' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"list","limit":2,"sort":"foo"}' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"list","limit":2,"sort":"ASC","debug":true}' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"list","limit":2,"sort":"DESC","debug":true}' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"search","query":42,"offset":0,"limit":32,"sort":"DESC","debug":true}' "$URL" --output -
#curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"search","query":"_1","offset":0,"limit":32,"sort":"DESC","debug":true}' "$URL" --output -
