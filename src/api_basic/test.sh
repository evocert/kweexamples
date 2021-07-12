#!/bin/bash
PROTOCOL=http
HOST=skullquake.dedicated.co.za
PORT=80
HOST=localhost
PORT=8081
ENDPOINT=/kweexamples/src/api_basic/api/
OUTFMT=json
URL=$PROTOCOL://$HOST:$PORT$ENDPOINT
#--------------------------------------------------------------------------------
echo query parameters:
curl "$URL?cmd=help&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=add&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=sub&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=mul&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=div&a=4&b=2&outfmt="$OUTFMT"" --output -
echo json body:
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"help","outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"add","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"sub","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"mul","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"div","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
echo query parameters and json body:
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=div" --output -
echo xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>help</cmd><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>add</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>sub</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>mul</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>div</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>div</cmd><a>4</a><b>2</b><c><d><e>4</e><f>2</f></d></c><outfmt>xml</outfmt></api>' "$URL" --output -
echo query parameters and xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=div" --output -
#--------------------------------------------------------------------------------
OUTFMT=xml
echo query parameters:
curl "$URL?cmd=help&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=add&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=sub&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=mul&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=div&a=4&b=2&outfmt="$OUTFMT"" --output -
echo json body:
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"help","outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"add","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"sub","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"mul","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"div","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
echo query parameters and json body:
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=div" --output -
echo xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>help</cmd><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>add</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>sub</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>mul</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>div</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>div</cmd><a>4</a><b>2</b><c><d><e>4</e><f>2</f></d></c><outfmt>xml</outfmt></api>' "$URL" --output -
echo query parameters and xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=div" --output -
