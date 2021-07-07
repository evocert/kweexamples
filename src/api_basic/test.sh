#!/bin/bash
PROTOCOL=http
HOST=localhost
PORT=8081
ENDPOINT=/kweexamples/src/api_basic/api/
URL=$PROTOCOL://$HOST:$PORT$ENDPOINT
echo query parameters:
curl "$URL?cmd=help" --output -
curl "$URL?cmd=add&a=4&b=2" --output -
curl "$URL?cmd=sub&a=4&b=2" --output -
curl "$URL?cmd=mul&a=4&b=2" --output -
curl "$URL?cmd=div&a=4&b=2" --output -
echo json body:
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"help"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"add","a":4,"b":2}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"sub","a":4,"b":2}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"mul","a":4,"b":2}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"div","a":4,"b":2}' "$URL" --output -
echo query parameters and json body:
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2}' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2}' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2}' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2}' "$URL?cmd=div" --output -
echo xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>help</cmd></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>add</cmd><a>4</a><b>2</b></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>sub</cmd><a>4</a><b>2</b></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>mul</cmd><a>4</a><b>2</b></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>div</cmd><a>4</a><b>2</b></api>' "$URL" --output -
echo query parameters and xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b></api>' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b></api>' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b></api>' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b></api>' "$URL?cmd=div" --output -

